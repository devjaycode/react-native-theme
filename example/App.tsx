import Home from './src/App';
import { ThemeProvider, themeBuilder } from 'react-native-theme';

export default function App() {
  const themes = themeBuilder({
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
