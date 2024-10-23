import type { ReactNode } from 'react';
import type { Animated, TextStyle, ViewStyle } from 'react-native';

export interface ThemeProviderProps {
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

export interface ThemeOption {
  label: string;
  value: string;
}

export interface ThemeDialogAnimationConfig {
  show: {
    scale: Animated.SpringAnimationConfig;
    opacity: Animated.TimingAnimationConfig;
  };
  hide: {
    scale: Animated.TimingAnimationConfig;
    opacity: Animated.TimingAnimationConfig;
  };
}

export interface ThemeDialogStyles {
  overlay: ViewStyle;
  dialog: ViewStyle;
  dialogLine: ViewStyle;
  title: TextStyle;
  menuItem: ViewStyle;
  menuItemText: TextStyle;
}
