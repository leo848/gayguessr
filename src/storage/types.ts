export type Game = {
	id ?: number;
	timeStarted: Date;
	timeEnded: Date;
	playedFlags: {
		title: string;
		correct: boolean;
	}[]
}
