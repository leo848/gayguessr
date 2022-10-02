export type IntoGame = {
	timeStarted: Date;
	timeEnded: Date;
	playedFlags: {
		title: string;
		correct: boolean;
	}[]
}

export type Game = IntoGame & { id: number }
