import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeMode } from '../enum/ThemeMode';
import type {
  Theme,
  ThemeBuilder,
  ThemeContext,
  ThemeProviderProps,
} from '../types';

const THEME_STORAGE_KEY = '@app/theme';

const ThemeContext = createContext<ThemeContext | undefined>(undefined);

/**
 * Creates a theme builder instance with the provided themes configuration
 * @param themes - Theme builder configuration
 * @returns ThemeBuilder instance
 */
export const createThemeBuilder = (themes: ThemeBuilder): ThemeBuilder => {
  return themes;
};

/**
 * Theme Provider component that manages theme state and persistence
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  themeBuilder,
  children,
}) => {
  const [theme, setThemeState] = useState<Theme | undefined>(undefined);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

        if (storedTheme) {
          setThemeState(getThemeByName(storedTheme));
        } else if (themeBuilder.defaultTheme) {
          setTheme(themeBuilder.defaultTheme);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    initializeTheme();
  }, [themeBuilder]);

  /**
   * Persists theme selection to storage
   */
  const persistTheme = async (themeName: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, themeName);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  /**
   * Checks if a theme with the given name exists in the theme builder
   */
  const isThemeAvailable = (themeName: string): boolean => {
    return (
      themeBuilder.buildTheme?.()?.some((theme) => theme.name === themeName) ??
      false
    );
  };

  /**
   * Retrieves theme configuration by name
   */
  const getThemeByName = (themeName: string): Theme => {
    // Check for custom themes
    if (themeBuilder.buildTheme && isThemeAvailable(themeName)) {
      const customTheme = themeBuilder
        .buildTheme()
        .find((theme) => theme.name === themeName)?.theme;

      if (customTheme) {
        return customTheme;
      }
    }

    // Handle system themes
    if (
      [ThemeMode.Dark, ThemeMode.Light, ThemeMode.System].includes(
        themeName as ThemeMode
      ) &&
      themeBuilder.darkTheme &&
      themeBuilder.lightTheme
    ) {
      switch (themeName) {
        case ThemeMode.Dark:
          return themeBuilder.darkTheme;
        case ThemeMode.Light:
          return themeBuilder.lightTheme;
        case ThemeMode.System:
          return colorScheme === 'dark'
            ? themeBuilder.darkTheme
            : themeBuilder.lightTheme;
      }
    }

    throw new Error(
      `Theme '${themeName}' not found. Please ensure the theme is included in themeBuilder.`
    );
  };

  /**
   * Updates the current theme
   */
  const setTheme = (themeName: string): void => {
    setThemeState(getThemeByName(themeName));
    void persistTheme(themeName);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to access the current theme and theme setter
 * @throws Error if used outside of ThemeProvider
 */
export function useTheme<T>() {
  const context = React.useContext(ThemeContext) as {
    theme: T;
    setTheme: (theme: string) => void;
  };

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
