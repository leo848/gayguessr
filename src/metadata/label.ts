import { Flag } from '../flags/flag';
import { flagPresets } from '../flags/flagPresets';
import { parse } from 'yaml';

export type YamlLabel = {
	  title: string;
	  aliases: string[];
	  description: string;
	  categories: string[];
};


export type Label = YamlLabel & {
	  flag: Flag;
	  alternativeFlags: Flag[];
};

function isYamlLabel(yamlLabel: YamlLabel | null): yamlLabel is YamlLabel {
	if (yamlLabel === null) return false;
	if (typeof yamlLabel.title !== 'string') return false;
	if (typeof yamlLabel.description !== 'string') return false;
	if (!Array.isArray(yamlLabel.categories)) return false;
	return true;
}

let labels: { [key: string]: Label } | null = null;

export async function loadLabels(): Promise<{ [key: string]: Label }> {
	if (labels != null) return labels;
	else labels = {};
	const keys = Object.keys(flagPresets);
	const values = await Promise.all(keys.map(loadLabel));
	keys.forEach((key, i) => labels[key] = values[i]);
	return labels;
}

export async function loadLabel(key: string): Promise<Label | null> {
	let lazyLabel = labels != null && labels[key];
	if (lazyLabel) return lazyLabel;

	try {
		const fetchedRawYaml = await fetch(import.meta.env.BASE_URL + 'metadata/' + key + '.yml');
		const text = await fetchedRawYaml.text();
		const yamlLabel = parse(text) as YamlLabel | null;

		if (!isYamlLabel(yamlLabel)) return null;

		yamlLabel.aliases = yamlLabel.aliases || [];

		return {
			...yamlLabel,
			flag: flagPresets[yamlLabel.title],
			alternativeFlags: [] // TODO: load alternative flags
		}
	} catch (e) {
		console.error(e);
		return null;
	}
}
