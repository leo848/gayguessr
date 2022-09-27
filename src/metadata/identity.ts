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

function isYamlIdentity(yamlIdentity: YamlIdentity | null): yamlIdentity is YamlIdentity {
	if (yamlIdentity === null) return false;
	if (typeof yamlIdentity.title !== 'string') return false;
	if (typeof yamlIdentity.description !== 'string') return false;
	if (!Array.isArray(yamlIdentity.categories)) return false;
	return true;
}

export async function loadIdentity(base: string, key: string): Promise<Identity | null> {
	try {
		const fetchedRawYaml = await fetch(base + 'metadata/' + key + '.yml');
		const text = await fetchedRawYaml.text();
		const yamlIdentity = parse(text) as YamlIdentity | null;
		yamlIdentity.aliases = yamlIdentity.aliases || [];

		if (!isYamlIdentity(yamlIdentity)) return null;
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
