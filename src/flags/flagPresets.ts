import { Flag } from "./flag";

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
	]),
	"genderfluid": Flag.horizontal([
		"#ff76a4",
		"#ffffff",
		"#c011d7",
		"#000000",
		"#2f3cbe",
	]),
	"demisexual": Flag.horizontalWithRatio([
		["#ffffff", 5],
		["#6e0070", 2],
		["#d2d2d2", 5],
	]).overlay(Flag.triangleOverlay("#000000", 143/400)),
	"demiromantic": Flag.horizontalWithRatio([
		["#ffffff", 5],
		["#339933", 2],
		["#d2d2d2", 5],
	]).overlay(Flag.triangleOverlay("#000000", 143/400)),
	"demigirl": Flag.horizontal([
		"#7f7f7f",
		"#c4c4c4",
		"#fdadc8",
		"#ffffff",
		"#fdadc8",
		"#c4c4c4",
		"#7f7f7f",
	]),
	"demiboy": Flag.horizontal([
		"#7f7f7f",
		"#c4c4c4",
		"#9dd7ea",
		"#ffffff",
		"#9dd7ea",
		"#c4c4c4",
		"#7f7f7f",
	]),
	"deminonbinary": Flag.horizontal([
		"#7f7f7f",
		"#c3c3c3",
		"#f5ff77",
		"#ffffff",
		"#f5ff77",
		"#c3c3c3",
		"#7f7f7f",
	]),
	"demifaun": Flag.horizontalWithRatio([
		["#7f7f7f", 2],
		["#c6c6c6", 2],
		["#fcc688", 1],
		["#fff19c", 1],
		["#ffffff", 1],
		["#8de0d5", 1],
		["#9682ec", 1],
		["#c6c6c6", 2],
		["#7f7f7f", 2],
	]),
	"demiandrogyne": Flag.horizontal([
		"#7e7e7e",
		"#c5c5c5",
		"#f92e8e",
		"#57218b",
		"#09c3ed",
		"#c5c5c5",
		"#7e7e7e",
	]),
	"multigender": Flag.horizontal([
		"#4f00cb",
		"#009be9",
		"#ff7400",
		"#009be9",
		"#4f00cb",
	]),
	"bigender": Flag.horizontal([
		"#c470a2",
		"#eda5cd",
		"#d6c7e8",
		"#ffffff",
		"#d6c7e8",
		"#9ac7e8",
		"#6d82d1",
	]),
}
