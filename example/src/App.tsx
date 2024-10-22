import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ThemeDialog, useTheme } from 'react-native-theme';

interface Colors {
  backgroundColor: string;
  textColor: string;
  themeDialogBackgroundColor: string;
  themeDialogTextColor: string;
  themeDialogStrokeColor: string;
}

export default function Home() {
  const { theme, setTheme } = useTheme<Colors>();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View
      style={[styles.container, { backgroundColor: theme?.backgroundColor }]}
    >
      <Text
        style={{
          fontSize: 24,
          color: theme?.textColor,
          fontWeight: 'bold',
          margin: 24,
        }}
        onPress={() => setTheme('dark')}
      >
        React Theme
      </Text>

      <Button title="Show Dialog" onPress={() => setIsVisible(true)} />
      <ThemeDialog
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        theme={{
          backgroundColor: theme?.themeDialogBackgroundColor,
          textColor: theme?.themeDialogTextColor,
          strokeColor: theme?.themeDialogStrokeColor,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
