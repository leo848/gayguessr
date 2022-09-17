import { parseColor, colorToString, Color } from "./parseColor";

type Stripe = {
	color: Color;
	size?: number;
}

export abstract class Flag {
	public static horizontal(rows: string[]): Flag {
		return this.verticalWithRatio(rows.map(row => [row, 1]));
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

	public abstract paint(ctx: CanvasRenderingContext2D): void;
}

class HorizontalFlag extends Flag {
	rows: Stripe[];
	constructor(colors: Stripe[]) {
		super()
		this.rows = colors;
	}

	public paint(ctx: CanvasRenderingContext2D): void {
		let height = ctx.canvas.height;
		let width = ctx.canvas.width;
		let rowHeight = height / this.rows.map(s => s.size ?? 1).reduce((a, b) => a + b);
		for (let i = 0, height = 0; i < this.rows.length; i++) {
			let { color, size } = this.rows[i];
			let delta = (size ?? 1) * rowHeight;
			ctx.fillStyle = colorToString(color);
			ctx.fillRect(0, height, width, delta);
			height += delta;

		}
	}
}

class VerticalFlag extends Flag {
	columns: Stripe[];
	constructor(colors: Stripe[]) {
		super()
		this.columns = colors;
	}

	public paint(ctx: CanvasRenderingContext2D): void {
		throw new Error("Method not implemented.");
	}
}
