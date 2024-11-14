export class ColorUtils {
	// Method to calculate the luminance of a color
	static getLuminance(hex: string): number {
		const r = parseInt(hex.substring(1, 3), 16) / 255;
		const g = parseInt(hex.substring(3, 5), 16) / 255;
		const b = parseInt(hex.substring(5, 7), 16) / 255;
		const a = [r, g, b].map((v) => {
			return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
		});
		return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
	}

	// Method to decide if the label will be black or white
	static getTextColor(hex: string): string {
		const luminance = ColorUtils.getLuminance(hex);
		return luminance > 0.2 ? "black" : "white";
	}

	// Method to generate a random color and decide the text color (black or white) based on luminance
	static getRandomColor(): { color: string; textColor: string } {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		const color = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
		const textColor = ColorUtils.getTextColor(color);
		return { color, textColor };
	}

	// Method to generate a monochromatic color palette
	static getMonochromaticPalette(qtd: number, preSelectedColor: string | null) {
		const baseColor = preSelectedColor ? preSelectedColor : ColorUtils.getRandomColor().color;
		const palette = [];
		for (let i = 0; i < qtd; i++) {
			const variation = i * 15; // Variação no brilho
			const color = ColorUtils.adjustBrightness(baseColor, variation);
			palette.push({ color, textColor: ColorUtils.getTextColor(color) });
		}
		return palette;
	}

	// Method to generate an analogous color palette
	static getAnalogousPalette(qtd: number) {
		const baseHue = Math.floor(Math.random() * 360);
		const saturation = Math.floor(Math.random() * 40) + 60; // Varies between 60% and 100%
		const lightness = Math.floor(Math.random() * 20) + 40; // Varies between 40% and 60%
		const palette = [];

		for (let i = 0; i < qtd; i++) {
			const hue = (baseHue + i * 30) % 360; // Colors spaced by 30 degrees
			const color = ColorUtils.hslToHex(hue, saturation, lightness);
			palette.push({ color, textColor: ColorUtils.getTextColor(color) });
		}
		return palette;
	}

	// Method to generate a triadic color palette
	static getTriadicPalette(qtd: number) {
		const baseHue = Math.floor(Math.random() * 360);
		const saturation = Math.floor(Math.random() * 40) + 60; // Varies between 60% and 100%
		const lightness = Math.floor(Math.random() * 20) + 40; // Varies between 40% and 60%
		const palette = [];

		for (let i = 0; i < qtd; i++) {
			const hue = (baseHue + i * 120) % 360; // Colors spaced by 120 degrees
			const color = ColorUtils.hslToHex(hue, saturation, lightness);
			palette.push({ color, textColor: ColorUtils.getTextColor(color) });
		}
		return palette;
	}

	// Method to generate a tetradic color palette
	static getTetradicPalette(qtd: number) {
		const baseHue = Math.floor(Math.random() * 360);
		const saturation = Math.floor(Math.random() * 40) + 60; // Varies between 60% and 100%
		const lightness = Math.floor(Math.random() * 20) + 40; // Varies between 40% and 60%
		const palette = [];

		for (let i = 0; i < qtd; i++) {
			const hue = (baseHue + i * 90) % 360; // Colors spaced by 90 degrees
			const color = ColorUtils.hslToHex(hue, saturation, lightness);
			palette.push({ color, textColor: ColorUtils.getTextColor(color) });
		}
		return palette;
	}

	// Converts HSL to HEX
	static hslToHex(h: number, s: number, l: number) {
		s /= 100;
		l /= 100;
		const k = (n: number) => (n + h / 30) % 12;
		const a = s * Math.min(l, 1 - l);
		const f = (n: number) =>
			Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))));
		return `#${f(0).toString(16).padStart(2, '0')}${f(8)
			.toString(16)
			.padStart(2, '0')}${f(4).toString(16).padStart(2, '0')}`.toUpperCase();
	}

	// Adjusts the brightness of a HEX color
	static adjustBrightness(hex: string, percent: number) {
		const num = parseInt(hex.slice(1), 16);
		const r = Math.min(255, (num >> 16) + percent);
		const g = Math.min(255, ((num >> 8) & 0x00ff) + percent);
		const b = Math.min(255, (num & 0x0000ff) + percent);
		return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`.toUpperCase();
	}

	// Method to calculate the contrast ratio between two colors and classify it
	static getContrastRatio(hex1: string, hex2: string): { contrast: number; classification: string } {
		const luminance1 = ColorUtils.getLuminance(hex1);
		const luminance2 = ColorUtils.getLuminance(hex2);

		const lighter = Math.max(luminance1, luminance2);
		const darker = Math.min(luminance1, luminance2);

		// Calculate the contrast ratio
		const contrastRatio = (lighter + 0.05) / (darker + 0.05);

		// Classify the contrast ratio based on WCAG guidelines
		let classification = '';
		if (contrastRatio < 3) {
			classification = 'Very Bad'; // Contrast ratio less than 3:1
		} else if (contrastRatio < 4.5) {
			classification = 'Bad'; // Contrast ratio between 3:1 and 4.5:1
		} else if (contrastRatio < 7) {
			classification = 'Medium'; // Contrast ratio between 4.5:1 and 7:1
		} else if (contrastRatio < 18) {
			classification = 'Good'; // Contrast ratio between 7:1 and 18:1
		} else {
			classification = 'Very Good'; // Maximum contrast ratio (21:1)
		}

		return { contrast: Number(contrastRatio.toFixed(2)), classification };
	}
}
