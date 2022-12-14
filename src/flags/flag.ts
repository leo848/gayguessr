import { parseColor, colorToString, Color } from "./color";

type Stripe = {
	flagOrColor: Flag;
	size?: number;
}

type DimensionContext = { x: number, y: number, width: number, height: number };

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

	public static triangleOverlay(color: string, type: TriangleType): Flag {
		return new TriangleOverlayFlag(parseColor(color), type);
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

	public context(context: (ctx: DimensionContext) => Partial<DimensionContext>): Flag {
		return new ContextFlag(this, context);
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

export type TriangleType = {
	type: "fromLeft",
	ratio ?: number,
} | {
	type: "fromTop",
	ratio ?: number,
};

class TriangleOverlayFlag extends Flag {
	color: Color;
	type: TriangleType;

	constructor(color: Color, type: TriangleType) {
		super()
		this.color = color;
		this.type = type;
	}

	public paint(
		ctx: CanvasRenderingContext2D,
		x: number = 0,
		y: number = 0,
		width: number = ctx.canvas.width - x,
		height: number = ctx.canvas.height - y,
	): void {
		let coords: [[number, number], [number, number], [number, number]];
		switch (this.type.type) {
			case "fromLeft":
				coords = [[x, y], [x + width * this.type.ratio, y + height / 2], [x, y + height]];
				break;
			case "fromTop":
				coords = [[x, y], [x + width / 2, y + height * this.type.ratio], [x + width, y]];
				break;
			default:
				throw new Error("Unreachable");
		};
		ctx.fillStyle = colorToString(this.color);
		ctx.beginPath();
		ctx.moveTo(...coords[0]);
		ctx.lineTo(...coords[1]);
		ctx.lineTo(...coords[2]);
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

class ContextFlag extends Flag {
	flag: Flag;
	dimensionContext: (context: DimensionContext) => Partial<DimensionContext>;

	constructor(flag: Flag, dimensionContext: (context: DimensionContext) => Partial<DimensionContext>) {
		super()
		this.flag = flag;
		this.dimensionContext = dimensionContext;
	}

	public paint(
		ctx: CanvasRenderingContext2D,
		x: number = 0,
		y: number = 0,
		width: number = ctx.canvas.width - x,
		height: number = ctx.canvas.height - y,
	): void {
		const oldContext = { x, y, width, height };
		const context = { ...oldContext, ...this.dimensionContext(oldContext) }; 
		this.flag.paint(ctx, context.x, context.y, context.width, context.height);
	}

	public colors(): string[] {
		return this.flag.colors();
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
