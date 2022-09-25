import { parseColor, colorToString, Color } from "./parseColor";

type Stripe = {
	color: Color;
	size?: number;
}

export abstract class Flag {
	public static defaultFlag(): Flag {
		return new DefaultFlag();
	}
	public static horizontal(rows: string[]): Flag {
		return this.horizontalWithRatio(rows.map(row => [row, 1]));
	}

	public static horizontalWithRatio(rows: [string, number][]): Flag {
		let stripes: Stripe[] = rows.map(([color, size]) => {return {color: parseColor(color), size}});
		return new HorizontalFlag(stripes);
	}

	public static vertical(columns: string[]): Flag {
		return this.verticalWithRatio(columns.map(color => [color, 1]));
	}

	public static verticalWithRatio(columns: [string, number][]): Flag {
		let stripes: Stripe[] = columns.map(([color, size]) => {return {color: parseColor(color), size}});
		return new VerticalFlag(stripes);
	}

	public static triangleOverlay(color: string, ratio: number) {
		return new TriangleOverlayFlag(parseColor(color), ratio);
	}

	public abstract paint(
		ctx: CanvasRenderingContext2D,
		x?: number,
		y?: number,
		width?: number,
		height?: number
	): void;

	public abstract colors(): string[];

	public overlay(flag: Flag): Flag {
		return new OverlayFlag(this, flag);
	}
}

class DefaultFlag extends Flag {
	innerFlag: Flag = Flag.horizontal(["black"]);
	public paint(
		ctx: CanvasRenderingContext2D,
		x: number = 0,
		y: number = 0,
		width: number = ctx.canvas.width - x,
		height: number = ctx.canvas.height - y
	): void {
		this.innerFlag.paint(ctx);
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.font = "40px Roboto";
		ctx.fillText("No flag given", width / 2, height / 2);
	}

	public colors(): string[] {
		return ["black", "white"];
	}
}

class HorizontalFlag extends Flag {
	rows: Stripe[];
	constructor(colors: Stripe[]) {
		super()
		this.rows = colors;
	}

	public paint(
		ctx: CanvasRenderingContext2D,
		x: number = 0,
		y: number = 0,
		width: number = ctx.canvas.width - x,
		height: number = ctx.canvas.height - y,
	): void {
		let rowHeight = height / this.rows.map(s => s.size ?? 1).reduce((a, b) => a + b);
		for (let i = 0, height = 0; i < this.rows.length; i++) {
			let { color, size } = this.rows[i];
			let delta = (size ?? 1) * rowHeight;
			ctx.fillStyle = colorToString(color);
			ctx.fillRect(x, y+height, width, delta);
			height += delta;
		}
	}

	public colors(): string[] {
		return this.rows.map(s => s.color).map(colorToString);
	}
}

class VerticalFlag extends Flag {
	columns: Stripe[];
	constructor(colors: Stripe[]) {
		super()
		this.columns = colors;
	}

	public paint(
		ctx: CanvasRenderingContext2D,
		x: number = 0,
		y: number = 0,
		width: number = ctx.canvas.width - x,
		height: number = ctx.canvas.height - y,
	): void {
		let columnWidth = width / this.columns.map(s => s.size ?? 1).reduce((a, b) => a + b);
		for (let i = 0, width = 0; i < this.columns.length; i++) {
			let { color, size } = this.columns[i];
			let delta = (size ?? 1) * columnWidth;
			ctx.fillStyle = colorToString(color);
			ctx.fillRect(x + width, y, delta, height);
			width += delta;
		}
	}

	public colors(): string[] {
		return this.columns.map(s => s.color).map(colorToString);
	}
}

class TriangleOverlayFlag extends Flag {
	color: Color;
	ratio: number;

	constructor(color: Color, ratio: number) {
		super()
		this.color = color;
		this.ratio = ratio;
	}

	public paint(
		ctx: CanvasRenderingContext2D,
		x: number = 0,
		y: number = 0,
		width: number = ctx.canvas.width - x,
		height: number = ctx.canvas.height - y,
	): void {
		let absoluteRatio = this.ratio * width;
		ctx.fillStyle = colorToString(this.color);
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + absoluteRatio, y + height / 2);
		ctx.lineTo(x, y + height);
		ctx.fill();
	}

	public colors(): string[] {
		return [colorToString(this.color)];
	}
}

export class OverlayFlag extends Flag {
	flags: Flag[];
	constructor(...flags: Flag[]) {
		super()
		this.flags = flags;
	}

	public paint(
		ctx: CanvasRenderingContext2D,
		x: number = 0,
		y: number = 0,
		width: number = ctx.canvas.width - x,
		height: number = ctx.canvas.height - y,
	): void {
		this.flags.forEach(flag => flag.paint(ctx, x, y, width, height));
	}

	public colors(): string[] {
		return this.flags.map(f => f.colors()).reduce((a, b) => a.concat(b));
	}
}
