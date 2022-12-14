import { defaultSettings, defaultGameSettings } from './defaults';
import type { Game, IntoGame, Settings, GameSettings } from './types';

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

export function loadSettings(): Settings {
	return {
		...defaultSettings,
		...JSON.parse(localStorage.getItem('settings') || '{}')
	};
}

export function changeSettings(newSettings: Partial<Settings>): void {
	const settings = loadSettings();
	localStorage.setItem('settings', JSON.stringify({
		...settings,
		...newSettings
	}));
}

export function restoreDefaultSettings(): void {
	localStorage.setItem('settings', '{}');
}

export function loadGameSettings(): GameSettings {
	return {
		...defaultGameSettings,
		...JSON.parse(localStorage.getItem('gameSettings') || '{}')
	};
}

export function changeGameSettings(newSettings: Partial<GameSettings>): void {
	const settings = loadGameSettings();
	localStorage.setItem('gameSettings', JSON.stringify({
		...settings,
		...newSettings
	}));
}

export function restoreDefaultGameSettings(): void {
	localStorage.setItem('gameSettings', '{}');
}

