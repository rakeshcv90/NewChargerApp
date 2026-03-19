import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CustomText from './CustomText';
import { useTheme } from '../Utility/ThemeContext';
import Fonts from '../Utility/Fonts';
import { s, vs, ms } from '../Utility/Scaling';

const { width, height } = Dimensions.get('window');

const ExitDialog = ({ visible, onClose, onConfirm }) => {
  const { colors, theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        scaleAnim.setValue(0.7);
      });
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.backdrop, 
            { 
              backgroundColor: 'rgba(0,0,0,0.7)',
              opacity: opacityAnim 
            }
          ]} 
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={onClose}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.dialogContainer,
            {
              backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
              borderColor: colors.border,
              borderWidth: 1,
            },
          ]}
        >
          <View style={styles.iconWrapper}>
            <LinearGradient
              colors={[colors.error, '#FF3333']}
              style={styles.iconCircle}
            >
              <MaterialIcons name="exit-to-app" size={ms(28)} color={colors.white} />
            </LinearGradient>
          </View>

          <CustomText
            font={Fonts.extraBold}
            size={ms(18)}
            color={colors.textPrimary}
            align="center"
            style={styles.title}
          >
            Exit App?
          </CustomText>

          <CustomText
            font={Fonts.medium}
            size={ms(14)}
            color={colors.textSecondary}
            align="center"
            style={styles.subtitle}
          >
            Are you sure you want to leave?
          </CustomText>

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.cancelBtn, { borderColor: colors.border, borderWidth: 1.5 }]} 
              onPress={onClose}
            >
              <CustomText font={Fonts.bold} size={ms(13)} color={colors.textSecondary}>
                No
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.confirmBtn} 
              onPress={onConfirm}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                style={styles.confirmGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <CustomText font={Fonts.extraBold} size={ms(13)} color={colors.textOnPrimary}>
                  Yes, Exit
                </CustomText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  dialogContainer: {
    width: width * 0.85,
    borderRadius: ms(24),
    padding: s(24),
    alignItems: 'center',
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  iconWrapper: {
    marginBottom: vs(12),
  },
  iconCircle: {
    width: ms(56),
    height: ms(56),
    borderRadius: ms(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: vs(6),
  },
  subtitle: {
    marginBottom: vs(24),
    paddingHorizontal: s(10),
    lineHeight: vs(20),
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: s(10),
  },
  cancelBtn: {
    flex: 1,
    height: vs(44),
    borderRadius: ms(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtn: {
    flex: 1.2,
    height: vs(44),
    borderRadius: ms(12),
    overflow: 'hidden',
  },
  confirmGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExitDialog;
