export interface ColorSystem {
  primary: string;
  secondary: string;
  neutral: {
    light: {
      foreground: string;
      background: string;
      border: string;
      copy: string;
      copyLight: string;
      copyLighter: string;
    };
    dark: {
      foreground: string;
      background: string;
      border: string;
      copy: string;
      copyLight: string;
      copyLighter: string;
    };
  };
  utility: {
    success: string;
    warning: string;
    error: string;
    successContent: string;
    warningContent: string;
    errorContent: string;
  };
}

