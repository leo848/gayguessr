import { Flag } from "./flag";

export const flagPresets = {
	pride: Flag.horizontal([
		"#e40303",
		"#ff8c00",
		"#ffed00",
		"#008026",
		"#24408e",
		"#732982",
	]),
	queer: Flag.horizontal([
		"#000000",
		"#8cdbec",
		"#009be9",
		"#a3f834",
		"#ffffff",
		"#ffd100",
		"#ff4659",
		"#ffa0c5",
		"#000000",
	]),
	transgender: Flag.horizontal([
		"5bcefa",
		"f5a9b8",
		"ffffff",
		"f5a9b8",
		"5bcefa",
	]),
	transfeminine: Flag.horizontal([
		"#73deff",
		"#ffe0ed",
		"#ffb5d5",
		"#ff8cbe",
		"#ffb5d5",
		"#ffe0ed",
		"#73deff",
	]),
	transmasculine: Flag.horizontal([
		"#ff8abe",
		"#cdf5ff",
		"#99ebff",
		"#74dfff",
		"#99ebff",
		"#cdf5ff",
		"#ff8abe",
	]),
	nonbinary: Flag.horizontal([
		"fcf434",
		"ffffff",
		"9c59d1",
		"2c2c2c",
	]),
	bisexual: Flag.horizontalWithRatio([
		["d60270", 2],
		["9b4f96", 1],
		["0038a8", 2],
	]),
	gay: Flag.horizontal([
		"#078d70",
		"#26ceaa",
		"#98e8c1",
		"#ffffff",
		"#7bade2",
		"#5049cc",
		"#3d1a78",
	]),
	lesbian: Flag.horizontal([
		"#d52d00",
		"#ef7627",
		"#ff9a55",
		"#ffffff",
		"#d162a4",
		"#b55690",
		"#a30262",
	]),
	agender: Flag.horizontal([
		"#000000",
		"#bcc4c7",
		"#ffffff",
		"#b7f684",
		"#ffffff",
		"#bcc4c7",
		"#000000",
	]),
	asexual: Flag.horizontal([
		"#000000",
		"#a3a3a3",
		"#ffffff",
		"#800080",
	]),
	aromantic: Flag.horizontal([
		"#00b44b",
		"#99e07d",
		"#ffffff",
		"#a9a9a9",
		"#000000",
	]),
	graysexual: Flag.horizontal([
		"#790196",
		"#afb2af",
		"#ffffff",
		"#afb2af",
		"#790196",
	]),
	grayromantic: Flag.horizontal([
		"#2da038",
		"#afb2ad",
		"#ffffff",
		"#afb2ad",
		"#2da038",
	]),
	pansexual: Flag.horizontal([
		"#ff218c",
		"#ffd800",
		"#21b1ff",
	]),
	pangender: Flag.horizontal([
		"#fff798",
		"#ffddcd",
		"#ffebfb",
		"#ffffff",
		"#ffebfb",
		"#ffddcd",
		"#fff798"
	]),
	graygender: Flag.horizontalWithRatio([
		["#c0bdbe", 33],
		["#ffffff", 8],
		["#200081", 33],
		["#ffffff", 8],
		["#535253", 33],
	]),
	androgyne: Flag.vertical([
		"#fe007f",
		"#9832ff",
		"#00b8e7",
	]),
	genderfluid: Flag.horizontal([
		"#ff76a4",
		"#ffffff",
		"#c011d7",
		"#000000",
		"#2f3cbe",
	]),
	demisexual: Flag.horizontalWithRatio([
		["#ffffff", 5],
		["#6e0070", 2],
		["#d2d2d2", 5],
	]).overlay(Flag.triangleOverlay("#000000", 143/400)),
	demiromantic: Flag.horizontalWithRatio([
		["#ffffff", 5],
		["#339933", 2],
		["#d2d2d2", 5],
	]).overlay(Flag.triangleOverlay("#000000", 143/400)),
	demigirl: Flag.horizontal([
		"#7f7f7f",
		"#c4c4c4",
		"#fdadc8",
		"#ffffff",
		"#fdadc8",
		"#c4c4c4",
		"#7f7f7f",
	]),
	demiboy: Flag.horizontal([
		"#7f7f7f",
		"#c4c4c4",
		"#9dd7ea",
		"#ffffff",
		"#9dd7ea",
		"#c4c4c4",
		"#7f7f7f",
	]),
	deminonbinary: Flag.horizontal([
		"#7f7f7f",
		"#c3c3c3",
		"#f5ff77",
		"#ffffff",
		"#f5ff77",
		"#c3c3c3",
		"#7f7f7f",
	]),
	demifluid: Flag.horizontal([
		"#7f7f7f",
		"#c3c3c3",
		Flag.gradient([
			"#f4a0a0",
			"#f3a99a",
			"#ffe500",
			"#eced96",
			"#aee1cc",
			"#00c3de",
			"#c6a8de",
			"#c6a8de",
		]),
		"#ffffff",
		Flag.gradient([
			"#f4a0a0",
			"#f3a99a",
			"#ffe500",
			"#eced96",
			"#aee1cc",
			"#00c3de",
			"#c6a8de",
			"#c6a8de",
		]),
		"#c3c3c3",
		"#7f7f7f",
	]),
	demifaun: Flag.horizontalWithRatio([
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
	demiandrogyne: Flag.horizontal([
		"#7e7e7e",
		"#c5c5c5",
		"#f92e8e",
		"#57218b",
		"#09c3ed",
		"#c5c5c5",
		"#7e7e7e",
	]),
	multigender: Flag.horizontal([
		"#4f00cb",
		"#009be9",
		"#ff7400",
		"#009be9",
		"#4f00cb",
	]),
	monogender: Flag.horizontal([
		"#6c6c6c",
		"#007440",
		"#21007c",
		"#a43900",
	]),
	multisexual: Flag.horizontal([
		"#724dc9",
		"#ffffff",
		"#9eefff",
		"#ff3d9b",
	]),
	monosexual: Flag.horizontalWithRatio([
		["#b65ab6",2],
		["#ca88ca",2],
		["#d6a3d6",2],
		["#ffffff",1],
		["#ffd509",1],
		["#646464",2],
		["#444444",2],
		["#000000",2],
	]),
	bigender: Flag.horizontal([
		"#c470a2",
		"#eda5cd",
		"#d6c7e8",
		"#ffffff",
		"#d6c7e8",
		"#9ac7e8",
		"#6d82d1",
	]),
	genderflux: Flag.horizontal([
		"#f57694",
		"#f2a3b9",
		"#cfcfcf",
		"#7be1f5",
		"#3ecdfa",
		"#fff48c",
	]),
	girlflux: Flag.horizontal([
		Flag.verticalWithRatio([
			["#69abe5", 1],
			["#9c81b6", 1],
			["#55bfab", 1],
			["#ffffff", 1],
			["#a9a9a9", 1],
			["#ee92d3", 5],
		]),
		"#e068e4",
		"#c340ce",
	]),
	boyflux: Flag.horizontal([
		Flag.verticalWithRatio([
			["#e48ae4", 1],
			["#9a81b4", 1],
			["#55bfab", 1],
			["#ffffff", 1],
			["#a8a8a8", 1],
			["#81d5ef", 5],
		]),
		"#69abe5",
		"#5276d4",
	]),
	abrosexual: Flag.horizontal([
		"#57d797",
		"#a8ebcd",
		"#fcfeff",
		"#f486b0",
		"#eb0062",
	]),
	androsexual: Flag.horizontal([
		"#01ccff",
		"#603524",
		"#b798dd",
	]),
	ceterosexual: Flag.horizontal([
		"#fcf980",
		"#169c47",
		"#ffffff",
		"#000000",
	]),
	gynesexual: Flag.horizontal([
		"#f4a9b7",
		"#903f2b",
		"#5b953b",
	]),
	omnisexual: Flag.horizontal([
		"#ff85ca",
		"#ff00b8",
		"#260044",
		"#7700fe",
		"#9097ff",
	]),
	polysexual: Flag.horizontal([
		"#ff00b2",
		"#00e973",
		"#0081f6",
	]),
}
