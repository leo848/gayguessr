import { parseColor, colorToString, Color } from "./parseColor";

export abstract class Flag {
	public static horizontal(rows: string[]): Flag {
		let colors: [number, number, number][] = rows.map(parseColor);
		return new HorizontalFlag(colors);
	}

	public static vertical(columns: string[]): Flag {
		let colors: [number, number, number][] = columns.map(parseColor);
		return new VerticalFlag(colors);
	}

	public abstract paint(ctx: CanvasRenderingContext2D): void;
}

class HorizontalFlag extends Flag {
	rows: Color[];
	constructor(colors: Color[]) {
		super()
		this.rows = colors;
	}

	public paint(ctx: CanvasRenderingContext2D): void {
		let height = ctx.canvas.height;
		let width = ctx.canvas.width;
		let rowHeight = height / this.rows.length;
		for (let i = 0; i < this.rows.length; i++) {
			let color = this.rows[i];
			ctx.fillStyle = colorToString(color);
			ctx.fillRect(0, i * rowHeight, width, rowHeight);
		}
	}
}

class VerticalFlag extends Flag {
	columns: Color[];
	constructor(colors: Color[]) {
		super()
		this.columns = colors;
	}

	public paint(ctx: CanvasRenderingContext2D): void {
		throw new Error("Method not implemented.");
	}
}
