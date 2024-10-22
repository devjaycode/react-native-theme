import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import type { ThemeDialogProps } from '../types';
import { useTheme } from '../context/ThemeContext';

const defaultColor = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  strokeColor: '#c0e6ba',
};

const ThemeDialog: React.FC<ThemeDialogProps> = ({
  visible,
  onClose,
  theme = defaultColor,
}) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { setTheme } = useTheme();

  const menu = [
    { label: 'Dark Theme', value: 'dark' },
    { label: 'Light Theme', value: 'light' },
    { label: 'System Default', value: 'system' },
  ];

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          bounciness: 10,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.dialog,
                {
                  opacity: opacityAnim,
                  transform: [{ scale: scaleAnim }],
                },
                {
                  backgroundColor: theme.backgroundColor,
                },
              ]}
            >
              <View
                style={[
                  styles.dialogLine,
                  { backgroundColor: theme.strokeColor },
                ]}
              ></View>
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
              {menu.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  onPress={() => {
                    setTheme(item.value);
                    onClose();
                  }}
                  activeOpacity={0.8}
                  style={[
                    styles.menuItem,
                    {
                      borderColor: theme.strokeColor,
                    },
                  ]}
                >
                  <Text style={{ fontSize: 15, color: theme.textColor }}>
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

const styles = StyleSheet.create({
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
    minWidth: Dimensions.get('window').width * 0.8,
    maxWidth: Dimensions.get('window').width * 0.9,
    shadowColor: '#00034',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  title: {
    fontWeight: 600,
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
    borderColor: defaultColor.strokeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dialogLine: {
    width: 38,
    height: 4,
    backgroundColor: defaultColor.strokeColor,
    borderRadius: 100,
    position: 'absolute',
    top: 12,
    left: Dimensions.get('window').width / 2 - 42,
  },
});

export default ThemeDialog;
