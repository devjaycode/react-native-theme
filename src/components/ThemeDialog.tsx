import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import type {
  ThemeDialogAnimationConfig,
  ThemeDialogProps,
  ThemeDialogStyles,
  ThemeOption,
} from '../types';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

const THEME_OPTIONS: ThemeOption[] = [
  { label: 'Dark Theme', value: 'dark' },
  { label: 'Light Theme', value: 'light' },
  { label: 'System Default', value: 'system' },
];

const DEFAULT_THEME = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  strokeColor: '#c0e6ba',
};

const ANIMATION_CONFIG: ThemeDialogAnimationConfig = {
  show: {
    scale: {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 10,
    },
    opacity: {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    },
  },
  hide: {
    scale: {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    },
    opacity: {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    },
  },
};

/**
 * ThemeDialog component for selecting theme preferences
 */
const ThemeDialog: React.FC<ThemeDialogProps> = ({
  visible,
  onClose,
  theme = DEFAULT_THEME,
}) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { setTheme } = useTheme();

  useEffect(() => {
    if (visible) {
      showDialog();
    } else {
      hideDialog();
    }
  }, [visible]);

  /**
   * Handles showing dialog with animation
   */
  const showDialog = (): void => {
    setModalVisible(true);
    Animated.parallel([
      Animated.spring(scaleAnim, ANIMATION_CONFIG.show.scale),
      Animated.timing(opacityAnim, ANIMATION_CONFIG.show.opacity),
    ]).start();
  };

  /**
   * Handles hiding dialog with animation
   */
  const hideDialog = (): void => {
    Animated.parallel([
      Animated.timing(scaleAnim, ANIMATION_CONFIG.hide.scale),
      Animated.timing(opacityAnim, ANIMATION_CONFIG.hide.opacity),
    ]).start(() => {
      setModalVisible(false);
    });
  };

  /**
   * Handles theme selection
   */
  const handleThemeSelection = (value: string): void => {
    setTheme(value);
    onClose();
  };

  const dialogAnimatedStyle = {
    opacity: opacityAnim,
    transform: [{ scale: scaleAnim }],
    backgroundColor: theme.backgroundColor,
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.dialog, dialogAnimatedStyle]}>
              <View
                style={[
                  styles.dialogLine,
                  { backgroundColor: theme.strokeColor },
                ]}
              />
              <Text
                style={[
                  styles.title,
                  {
                    color: theme.textColor,
                  },
                ]}
              >
                Select Your Preferred Theme
              </Text>
              {THEME_OPTIONS.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => handleThemeSelection(item.value)}
                  activeOpacity={0.8}
                  style={[
                    styles.menuItem,
                    {
                      borderColor: theme.strokeColor,
                    },
                  ]}
                >
                  <Text
                    style={[styles.menuItemText, { color: theme.textColor }]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create<ThemeDialogStyles>({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    borderRadius: 15,
    paddingVertical: 24,
    paddingHorizontal: 24,
    minWidth: WINDOW_WIDTH * 0.8,
    maxWidth: WINDOW_WIDTH * 0.9,
    shadowColor: '#000034',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  dialogLine: {
    width: 38,
    height: 4,
    borderRadius: 100,
    position: 'absolute',
    top: 12,
    left: WINDOW_WIDTH / 2 - 42,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 24,
    marginHorizontal: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  menuItem: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 15,
  },
});

export default ThemeDialog;
