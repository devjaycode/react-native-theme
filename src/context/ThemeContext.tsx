import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeMode } from '../enum/ThemeMode';
import type {
  Theme,
  ThemeBuilder,
  ThemeContext,
  ThemeProviderInterface,
} from '../types';

const ThemeContext = createContext<ThemeContext | undefined>(undefined);

const themeBuilder = (themes: ThemeBuilder) => {
  return themes;
};

const ThemeProvider: React.FC<ThemeProviderInterface> = ({
  themeBuilder,
  children,
}) => {
  const [theme, setThemeState] = useState<Theme | undefined>(undefined);
  const THEME_KEY = 'app-theme';
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function loadTheme() {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);

      if (storedTheme) {
        setThemeState(getTheme(storedTheme));
      } else if (themeBuilder.defaultTheme) {
        setTheme(themeBuilder.defaultTheme);
      }
    }

    loadTheme();
  }, [themeBuilder]);

  const saveTheme = async (themeName: string) => {
    await AsyncStorage.setItem(THEME_KEY, themeName);
  };

  const isThemeAvailable = (themeName: string) => {
    return (
      themeBuilder.buildTheme &&
      themeBuilder.buildTheme().some((theme) => theme.name === themeName)
    );
  };

  const getTheme = (themeName: string) => {
    if (themeBuilder.buildTheme && isThemeAvailable(themeName)) {
      return themeBuilder.buildTheme().find((theme) => theme.name === themeName)
        ?.theme;
    } else if (
      (themeName === ThemeMode.Dark ||
        themeName === ThemeMode.Light ||
        themeName === ThemeMode.System) &&
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
    } else {
      throw new Error(
        `Theme '${themeName}' not found. Are you sure you include the theme in themeBuilder?`
      );
    }
  };

  const setTheme = (themeName: string) => {
    setThemeState(getTheme(themeName));
    saveTheme(themeName);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme<T>() {
  const context = React.useContext(ThemeContext) as {
    theme: T;
    setTheme: (theme: string) => {};
  };
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { themeBuilder, ThemeProvider, useTheme };
