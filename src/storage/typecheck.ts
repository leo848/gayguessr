import type { IntoGame, Game } from './types';

export function isIntoGame(game: object): game is IntoGame {
	return typeof game["timeStarted"] === "object"
		&& typeof game["timeEnded"] === "object"
		&& Array.isArray(game["playedFlags"]);
}

export function isGame(game: object): game is Game {
	return isIntoGame(game)
		&& typeof game["id"] === "number";
}
