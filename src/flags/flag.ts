import { parseColor, colorToString, Color } from "./parseColor";

type Stripe = {
	flagOrColor: Flag;
	size?: number;
}

export abstract class Flag {
	public static defaultFlag(): Flag {
		return new DefaultFlag();
	}
	public static horizontal(rows: (string | Flag)[]): Flag {
		return this.horizontalWithRatio(rows.map(row => [row, 1]));
	}

	public static horizontalWithRatio(rows: [string | Flag, number][]): Flag {
		let stripes: Stripe[] = rows.map(([row, size]) => {
			return {
				flagOrColor: row instanceof Flag ? row : new OneColorFlag(parseColor(row)),
				size
			}
		});
		return new HorizontalFlag(stripes);
	}

	public static vertical(columns: (string|Flag)[]): Flag {
		return this.verticalWithRatio(columns.map(color => [color, 1]));
	}

	public static verticalWithRatio(columns: [string|Flag, number][]): Flag {
		let stripes: Stripe[] = columns.map(([column, size]) => {
			return {
				flagOrColor: column instanceof Flag ? column : new OneColorFlag(parseColor(column)),
				size
			}
		});
		return new VerticalFlag(stripes);
	}

	public static triangleOverlay(color: string, ratio: number): Flag {
		return new TriangleOverlayFlag(parseColor(color), ratio);
	}

	public static empty(): Flag {
		return new EmptyFlag();
	}

	public static oneColor(color: string): Flag {
		return new OneColorFlag(parseColor(color));
	}

	public static gradient(colors: string[]): Flag {
		return new GradientFlag(...colors.map(parseColor));
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
			let { flagOrColor, size } = this.rows[i];
			let delta = (size ?? 1) * rowHeight;
			if (flagOrColor instanceof Flag) {
				flagOrColor.paint(ctx, x, y + height, width, delta);
			} else {
				ctx.fillStyle = colorToString(flagOrColor);
				ctx.fillRect(x, y+height, width, delta);
			}
			height += delta;
		}
	}

	public colors(): string[] {
		return this.rows.map(s => s.flagOrColor).map(c => c instanceof Flag ? c.colors() : [colorToString(c)]).reduce((a, b) => a.concat(b));
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
			let { flagOrColor, size } = this.columns[i];
			let delta = (size ?? 1) * columnWidth;
			if (flagOrColor instanceof Flag) {
				flagOrColor.paint(ctx, x + width, y, delta, height);
			} else {
				ctx.fillStyle = colorToString(flagOrColor);
				ctx.fillRect(x + width, y, delta, height);
			}
			width += delta;
		}
	}

	public colors(): string[] {
		return this.columns.map(s => s.flagOrColor).map(c => c instanceof Flag ? c.colors() : [colorToString(c)]).reduce((a, b) => a.concat(b));
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

class OverlayFlag extends Flag {
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

class EmptyFlag extends Flag {
	public paint(): void { }

	public colors(): string[] {
		return [];
	}
}

class OneColorFlag extends Flag {
	color: Color;

	constructor(color: Color) {
		super()
		this.color = color;
	}

	public paint(
		ctx: CanvasRenderingContext2D,
		x: number = 0,
		y: number = 0,
		width: number = ctx.canvas.width - x,
		height: number = ctx.canvas.height - y,
	): void {
		ctx.fillStyle = colorToString(this.color);
		ctx.fillRect(x, y, width, height);
	}

	public colors(): string[] {
		return [colorToString(this.color)];
	}
}

class GradientFlag extends Flag {
	gradientElements: Color[];
	constructor(...gradientElements: Color[]) {
		super()
		this.gradientElements = gradientElements;
	}

	public paint(
		ctx: CanvasRenderingContext2D,
		x: number = 0,
		y: number = 0,
		width: number = ctx.canvas.width - x,
		height: number = ctx.canvas.height - y,
	): void {
		let gradient = ctx.createLinearGradient(x, y, x + width, y + height);
		this.gradientElements.forEach(
			(color, i) =>
				gradient.addColorStop(i / (this.gradientElements.length - 1), colorToString(color))
		);
		ctx.fillStyle = gradient;
		ctx.fillRect(x, y, width, height);
	}

	public colors(): string[] {
		return this.gradientElements.map(colorToString);
	}
}
