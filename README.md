<div align="center">
# React Native Theme

![npm version](https://img.shields.io/npm/v/@devjaycode/react-native-theme)
![license](https://img.shields.io/npm/l/@devjaycode/react-native-theme)

A flexible and easy-to-use theming solution for React Native applications, allowing developers to create dynamic themes with support for light, dark, and custom color schemes, along with system theme detection, persistence, and a beautifully designed built-in theme-switching dialog. 🌈

<div align="center">
![Sample screen record](samples/screen-record.gif)
![Sample screen record](samples/screen-record-2.gif)
</div>

</div>

## Features

- 🔄 System theme detection
- 💾 Theme persistence using `AsyncStorage`
- 🎨 Custom theme support
- 🎯 Built-in theme switching dialog
- 🔌 Easy to integrate
- 📦 Minimal performance overhead.
- 🎨 Effortlessly switch between multiple themes.

## Installation

```bash
# Using npm
npm install @devjaycode/react-native-theme

# Using yarn
yarn add @devjaycode/react-native-theme
```

## Basic Usage

1. First, define your themes:

```typescript
import { createThemeBuilder } from '@devjaycode/react-native-theme';

const themes = createThemeBuilder({
  lightTheme: {
    primaryColor: '#007AFF',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
  },
  darkTheme: {
    primaryColor: '#0A84FF',
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
  },
  defaultTheme: 'light', // Optional: specify default theme
});
```

2. Wrap your app with ThemeProvider:

```typescript
import { ThemeProvider } from '@devjaycode/react-native-theme';

function App() {
  return (
    <ThemeProvider themeBuilder={themes}>
      <YourApp />
    </ThemeProvider>
  );
}
```

3. Use the theme in your components:

```typescript
import { useTheme } from '@devjaycode/react-native-theme';

interface Colors {
  backgroundColor: string;
  textColor: string;
}

function MyComponent() {
  const { theme, setTheme } = useTheme<Colors>();

  return (
    <View style={{ backgroundColor: theme.backgroundColor }}>
      <Text style={{ color: theme.textColor }}>
        Hello, themed world!
      </Text>
    </View>
  );
}
```

## Theme Switching Dialog

The library includes a beautiful, animated theme switching dialog that you can easily integrate:

```typescript
import { ThemeDialog } from '@devjaycode/react-native-theme';

function MyComponent() {
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <>
      <Button
        title="Change Theme"
        onPress={() => setDialogVisible(true)}
      />

      <ThemeDialog
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        theme={{
          backgroundColor: '#ffffff',  // Optional: customize dialog background
          textColor: '#000000',       // Optional: customize text color
          strokeColor: '#c0e6ba',     // Optional: customize accent color
        }}
      />
    </>
  );
}
```

### Dialog Features

- 💫 Smooth scale and fade animations
- 🎨 Customizable colors
- 📱 Responsive design
- 🔄 Built-in theme options:
  - Light Theme
  - Dark Theme
  - System Default

## Advanced Usage

### Custom Themes

You can define custom themes beyond just light and dark:

```typescript
const themes = createThemeBuilder({
  buildTheme: () => [
    {
      name: 'blue',
      theme: {
        primaryColor: '#0000FF',
        // ... other colors
      },
    },
    {
      name: 'red',
      theme: {
        primaryColor: '#FF0000',
        // ... other colors
      },
    },
  ],
  defaultTheme: 'blue',
});
```

### System Theme Support

The library automatically handles system theme changes when using the 'system' theme mode:

```typescript
// Switch to system theme mode
const { setTheme } = useTheme();
setTheme('system');
```

### Theme Persistence

Themes are automatically persisted using AsyncStorage. The selected theme will be restored when the app restarts.

## API Reference

### ThemeProvider Props

| Prop         | Type            | Description                            |
| ------------ | --------------- | -------------------------------------- |
| themeBuilder | ThemeBuilder    | Object containing theme configurations |
| children     | React.ReactNode | Child components                       |

### ThemeDialog Props

| Prop    | Type        | Description                    |
| ------- | ----------- | ------------------------------ |
| visible | boolean     | Control dialog visibility      |
| onClose | () => void  | Callback when dialog is closed |
| theme   | DialogTheme | Optional theme customization   |

### useTheme Hook

Returns an object with:

- `theme`: Current theme object
- `setTheme`: Function to change the current theme

### ThemeMode Enum

```typescript
enum ThemeMode {
  Dark = 'dark',
  Light = 'light',
  System = 'system',
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [DevJayCode](https://github.com/devjaycode)
