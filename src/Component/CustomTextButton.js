import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Colors from '../Utility/Colors';
const CustomTextButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const variantStyles = VARIANTS[variant] || VARIANTS.primary;
  const sizeStyles = SIZES[size] || SIZES.md;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        variantStyles.container,
        sizeStyles.container,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variantStyles.loaderColor} />
      ) : (
        <Text
          style={[
            styles.baseText,
            variantStyles.text,
            sizeStyles.text,
            disabled && styles.disabledText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// ─── Variants ────────────────────────────────────────────────
const VARIANTS = {
  primary: {
    container: {
      backgroundColor: Colors.primaryDark,
      borderWidth: 0,
    },
    text: {
      color: Colors.black,
    },
    loaderColor: Colors.black,
  },
  secondary: {
    container: {
      backgroundColor: Colors.card,
      borderWidth: 1,
      borderColor: '#2D3135',
    },
    text: {
      color: Colors.white,
    },
    loaderColor: Colors.white,
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: Colors.primaryDark,
    },
    text: {
      color: Colors.primaryDark,
    },
    loaderColor: '#00FF95',
  },
  ghost: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    text: {
      color: '#00FF95',
    },
    loaderColor: '#00FF95',
  },
};

// ─── Sizes ───────────────────────────────────────────────────
const SIZES = {
  sm: {
    container: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
    text: { fontSize: 13 },
  },
  md: {
    container: { paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12 },
    text: { fontSize: 16 },
  },
  lg: {
    container: { paddingVertical: 18, paddingHorizontal: 32, borderRadius: 14 },
    text: { fontSize: 18 },
  },
};

// ─── Base Styles ─────────────────────────────────────────────
const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  baseText: {
    fontWeight: '700',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.4,
  },
  disabledText: {
    opacity: 0.6,
  },
});

export default CustomTextButton;
