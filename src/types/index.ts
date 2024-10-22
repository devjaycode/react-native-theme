import type { ReactNode } from 'react';

export interface ThemeProviderInterface {
  themeBuilder: ThemeBuilder;
  children: ReactNode;
}

export interface ThemeContext {
  theme: Theme | undefined;
  setTheme: (themeMode: string) => void;
}

export interface Theme {
  [key: string]: string;
}

export interface ThemeConfig {
  name: string;
  theme: Theme;
}

export interface ThemeBuilder {
  defaultTheme?: string;
  darkTheme: Theme;
  lightTheme: Theme;
  buildTheme?: () => Array<ThemeConfig>;
}

export interface ThemeDialogProps {
  theme?: ThemeDialogColor;
  visible: boolean;
  onClose: () => void;
}

export interface ThemeDialogColor {
  backgroundColor: string;
  textColor: string;
  strokeColor: string;
}
