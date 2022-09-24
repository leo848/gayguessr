import {Flag} from "./flag";

type PresetMap = { [key: string]: Flag };

export let flagPresets: PresetMap = {
	"pride": Flag.horizontal([
		"#e40303",
		"#ff8c00",
		"#ffed00",
		"#008026",
		"#24408e",
		"#732982",
	]),
	"trans": Flag.horizontal([
		"5bcefa",
		"f5a9b8",
		"ffffff",
		"f5a9b8",
		"5bcefa",
	]),
	"enby": Flag.horizontal([
		"fcf434",
		"ffffff",
		"9c59d1",
		"2c2c2c",
	]),
	"bi": Flag.horizontalWithRatio([
		["d60270", 2],
		["9b4f96", 1],
		["0038a8", 2],
	]),
	"mlm": Flag.horizontal([
		"#078d70",
		"#26ceaa",
		"#98e8c1",
		"#ffffff",
		"#7bade2",
		"#5049cc",
		"#3d1a78",
	]),
	"lesbian": Flag.horizontal([
		"#d52d00",
		"#ef7627",
		"#ff9a55",
		"#ffffff",
		"#d162a4",
		"#b55690",
		"#a30262",
	]),
	"agender": Flag.horizontal([
		"#000000",
		"#bcc4c7",
		"#ffffff",
		"#b7f684",
		"#ffffff",
		"#bcc4c7",
		"#000000",
	]),
	"ace": Flag.horizontal([
		"#000000",
		"#a3a3a3",
		"#ffffff",
		"#800080",
	]),
	"pan": Flag.horizontal([
		"#ff218c",
		"#ffd800",
		"#21b1ff",
	]),
	"androgyne": Flag.vertical([
		"#fe007f",
		"#9832ff",
		"#00b8e7",
	])
}
