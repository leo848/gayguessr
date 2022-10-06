export type IntoGame = {
	timeStarted: Date;
	timeEnded: Date;
	playedFlags: {
		title: string;
		chosen: string;
		correct: boolean;
	}[]
}

export type Game = IntoGame & { id: number }

export type Settings = {
	colorfulButtons: boolean,
	autoSkip: boolean,
}

export type StopAfter = 
	| { type: 'all' }
	| { type: 'amount', amount: number }
	| { type: 'time', time: number };

export type CategoryFilter = never; // TODO

export type GameSettings = {
	stopAfter: StopAfter,
	category ?: CategoryFilter,
};
