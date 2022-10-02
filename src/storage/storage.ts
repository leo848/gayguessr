import type { Game } from './types';

const GAMES_KEY = 'games';

export function loadGames(): Game[] {
	return JSON.parse(localStorage.getItem(GAMES_KEY) || '[]');
}

export function saveGame(game: Game): void {
	const games = loadGames();
	if (game.id === undefined) game.id = games.length;
	games.push(game);
	localStorage.setItem(GAMES_KEY, JSON.stringify(games));
}

export function deleteGame(game: Game): void {
	const games = loadGames();
	games.splice(game.id, 1);
	localStorage.setItem(GAMES_KEY, JSON.stringify(games));
}
