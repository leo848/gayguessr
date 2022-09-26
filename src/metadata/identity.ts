import { Flag } from '../flags/flag';
import { flagPresets } from '../flags/flagPresets';

type Identity = {
	  name: string;
	  aliases: string[];
	  description: string;
	  flag: Flag;
	  alternativeFlags: Flag[];
};
