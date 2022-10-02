import type { Game, IntoGame } from './types';

const GAMES_KEY = 'games';

export function loadGames(): Game[] {
	return JSON.parse(localStorage.getItem(GAMES_KEY) || '[]', (key, value) => {
		if (key === 'timeStarted' || key === 'timeEnded') {
			return new Date(value);
		} else {
			return value;
		}
	});
}

export function saveGame(game: IntoGame): void {
	const games = loadGames();
	let newGame = {
		...game,
		id: games.length
	}
	games.push(newGame);
	localStorage.setItem(GAMES_KEY, JSON.stringify(games));
}

export function deleteGame(id: number): void {
	const games = loadGames();
	games.splice(id, 1);
	for (let i = id; i < games.length; i++) {
		games[i].id = i;
	}
	localStorage.setItem(GAMES_KEY, JSON.stringify(games));
}
