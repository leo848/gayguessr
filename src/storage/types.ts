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

export type ApplySettings = Partial<Settings>;
