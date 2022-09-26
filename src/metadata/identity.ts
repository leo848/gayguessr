import { Flag } from '../flags/flag';
import { flagPresets } from '../flags/flagPresets';
import { parse } from 'yaml';

type YamlIdentity = {
	  title: string;
	  aliases: string[];
	  description: string;
	  categories: string[];
};


type Identity = YamlIdentity & {
	  flag: Flag;
	  alternativeFlags: Flag[];
};

export async function loadIdentity(key: string): Promise<Identity> {
	let fetchedRawYaml = await fetch(process.env.BASE_URL + '/metadata/' + key + '.yaml');
	let yamlIdentity = parse(await fetchedRawYaml.text()) as YamlIdentity;
	return {
		...yamlIdentity,
		flag: flagPresets[yamlIdentity.title],
		alternativeFlags: [] // TODO: load alternative flags
	}
}
