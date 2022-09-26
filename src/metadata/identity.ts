import { Flag } from '../flags/flag';
import { flagPresets } from '../flags/flagPresets';
import { parse } from 'yaml';

export type YamlIdentity = {
	  title: string;
	  aliases: string[];
	  description: string;
	  categories: string[];
};


export type Identity = YamlIdentity & {
	  flag: Flag;
	  alternativeFlags: Flag[];
};

export async function loadIdentity(base: string, key: string): Promise<Identity | null> {
	try {
		const fetchedRawYaml = await fetch(base + 'metadata/' + key + '.yml');
		const text = await fetchedRawYaml.text();
		console.log(`${key} Text: ${text}`);
		const yamlIdentity = parse(text) as YamlIdentity | null;
		console.log(`${key} Parsed yaml: ${yamlIdentity}`);
		if (yamlIdentity == null) {
			return null;
		}
		return {
			...yamlIdentity,
			flag: flagPresets[yamlIdentity.title],
			alternativeFlags: [] // TODO: load alternative flags
		}
	} catch (e) {
		console.error(e);
		return null;
	}
}
