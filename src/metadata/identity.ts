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

let identities: { [key: string]: Identity } | null = null;

export async function loadIdentities(): Promise<{ [key: string]: Identity }> {
	if (identities != null) return identities;
	else identities = {};
	for (const key of Object.keys(flagPresets)) {
		const identity = await loadIdentity(key);
		if (identity) identities[key] = identity;
	}
	console.log(identities);
	return identities;
}

export async function loadIdentity(key: string): Promise<Identity | null> {
	let lazyIdentity = identities[key];
	if (lazyIdentity) return lazyIdentity;

	try {
		const fetchedRawYaml = await fetch(import.meta.env.BASE_URL + 'metadata/' + key + '.yml');
		const text = await fetchedRawYaml.text();
		const yamlIdentity = parse(text) as YamlIdentity | null;

		if (!isYamlIdentity(yamlIdentity)) return null;

		yamlIdentity.aliases = yamlIdentity.aliases || [];

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
