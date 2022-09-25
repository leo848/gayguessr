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

	public abstract paint(
		ctx: CanvasRenderingContext2D,
		x?: number,
		y?: number,
		width?: number,
		height?: number
	): void;

	public abstract colors(): string[];
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
