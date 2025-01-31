import tinycolor from 'tinycolor2';

export type ColorShades = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryContent: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  secondaryContent: string;
};

export type NeutralColors = {
  foreground: string;
  background: string;
  border: string;
  copy: string;
  copyLight: string;
  copyLighter: string;
};

export type UtilityColors = {
  success: string;
  warning: string;
  error: string;
  successContent: string;
  warningContent: string;
  errorContent: string;
};

export function generateColorPalette(primaryColor: string, saturationAdjustment: number = 0, hueDegree: number = 90): ColorShades {
  const color = tinycolor(primaryColor);
  
  // Adjust saturation
  color.saturate(saturationAdjustment);
  
  // Primary colors
  const primary = color;
  const primaryLight = tinycolor(primaryColor).lighten(10); // Lighter version
  const primaryDark = tinycolor(primaryColor).darken(10); // Darker version
  const primaryContent = tinycolor(primaryColor).getBrightness() < 128 ? '#ffffff' : '#000000';

  // Generate secondary color with custom hue rotation
  const secondaryHue = (color.toHsl().h + hueDegree) % 360;
  const secondary = tinycolor({ h: secondaryHue, s: 100, l: 50 });
  const secondaryLight = secondary.clone().lighten(10);
  const secondaryDark = secondary.clone().darken(10);
  const secondaryContent = secondary.getBrightness() < 128 ? '#ffffff' : '#000000';

  return {
    primary: primary.toHexString(),
    primaryLight: primaryLight.toHexString(),
    primaryDark: primaryDark.toHexString(),
    primaryContent: primaryContent,
    secondary: secondary.toHexString(),
    secondaryLight: secondaryLight.toHexString(),
    secondaryDark: secondaryDark.toHexString(),
    secondaryContent: secondaryContent,
  };
}

export function generateNeutrals(baseColor: string): { light: NeutralColors; dark: NeutralColors } {
  return {
    light: {
      foreground: '#fbfbfb',
      background: '#efeff1',
      border: '#dfdde2',
      copy: '#262329',
      copyLight: '#645e6e',
      copyLighter: '#8a8495',
    },
    dark: {
      foreground: '#262329',
      background: '#19181b',
      border: '#3f3b45',
      copy: '#fbfbfb',
      copyLight: '#d8d6dc',
      copyLighter: '#a9a6af',
    },
  };
}

export function generateUtilityColors(): UtilityColors {
  return {
    success: '#61cc61',
    warning: '#cccc61',
    error: '#cc6161',
    successContent: '#0b230b',
    warningContent: '#23230b',
    errorContent: '#230b0b',
  };
}

