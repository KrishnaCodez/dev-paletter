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

export function generateColorPalette(primaryColor: string, saturationAdjustment: number = 0): ColorShades {
  const color = tinycolor(primaryColor);
  
  // Adjust saturation
  color.saturate(saturationAdjustment);
  
  // Generate secondary color with hue rotation
  const secondaryHue = (color.toHsl().h + 180) % 360;
  const secondaryColor = tinycolor({ h: secondaryHue, s: color.toHsl().s, l: color.toHsl().l });

  return {
    primary: color.toHexString(),
    primaryLight: color.clone().lighten(20).toHexString(),
    primaryDark: color.clone().darken(20).toHexString(),
    primaryContent: color.clone().isLight() ? '#000000' : '#ffffff',
    secondary: secondaryColor.toHexString(),
    secondaryLight: secondaryColor.clone().lighten(20).toHexString(),
    secondaryDark: secondaryColor.clone().darken(20).toHexString(),
    secondaryContent: secondaryColor.clone().isLight() ? '#000000' : '#ffffff',
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

