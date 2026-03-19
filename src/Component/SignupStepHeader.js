import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CustomText from './CustomText';
import { useTheme } from '../Utility/ThemeContext';
import Fonts from '../Utility/Fonts';
import { vs, ms } from '../Utility/Scaling';

const SignupStepHeader = ({ title, subtitle }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={[styles.iconGlow, { shadowColor: colors.primary }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialIcons name="bolt" size={ms(24)} color={colors.textOnPrimary} />
        </LinearGradient>
      </View>
      <View style={styles.textSection}>
        <CustomText
          font={Fonts.extraBold}
          size={vs(32)}
          color={colors.textPrimary}
          style={styles.title}
        >
          {title}
        </CustomText>
        {subtitle && (
          <CustomText
            font={Fonts.medium}
            size={vs(14)}
            color={colors.textSecondary}
            style={styles.subtitle}
          >
            {subtitle}
          </CustomText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: vs(24),
  },
  iconContainer: {
    marginBottom: vs(16),
  },
  iconGlow: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(14),
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: ms(8),
    elevation: 8,
  },
  textSection: {
    marginBottom: vs(4),
  },
  title: {
    lineHeight: vs(38),
    marginBottom: vs(2),
  },
  subtitle: {
    marginTop: vs(2),
  },
});

export default SignupStepHeader;
