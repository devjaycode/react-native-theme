import { createThemeBuilder, ThemeProvider } from '../src/context/ThemeContext';
import Home from './src/App';

export default function App() {
  const themes = createThemeBuilder({
    defaultTheme: 'light',
    darkTheme: {
      backgroundColor: 'black',
      textColor: 'white',
      themeDialogBackgroundColor: '#201e2a',
      themeDialogTextColor: '#ffffff',
      themeDialogStrokeColor: '#5b5673',
    },
    lightTheme: {
      backgroundColor: 'white',
      textColor: 'black',
      themeDialogBackgroundColor: '#ffffff',
      themeDialogTextColor: '#000000',
      themeDialogStrokeColor: '#c0e6ba',
    },
    buildTheme: () => [
      {
        name: 'blue',
        theme: {
          backgroundColor: '#2196f3',
          textColor: '#ffffff',
        },
      },
      {
        name: 'red',
        theme: {
          backgroundColor: '#ff0000',
          textColor: '#ffffff',
        },
      },
    ],
  });

  return (
    <ThemeProvider themeBuilder={themes}>
      <Home />
    </ThemeProvider>
  );
}
