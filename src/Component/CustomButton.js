import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import Fonts from '../Utility/Fonts';
import { ms, s, vs } from '../Utility/Scaling';
import { useTheme } from '../Utility/ThemeContext';


const CustomButton = ({
  title,
  onPress,
  backgroundColor,
  borderColor = 'transparent',
  borderWidth = 0,
  borderRadius,
  size = 'md',
  titleSize,
  titleFont = Fonts.bold,
  titleColor,
  icon,
  iconSize,
  iconColor,
  iconPosition = 'left',
  gap = 8,
  disabled = false,
  loading = false,
  fullWidth = false,
  activeOpacity = 0.8,
  shadowColor,
  shadowOpacity,
  shadowRadius,
  style,
  textStyle,
}) => {
  const { colors } = useTheme();
  const sSize = SIZES[size] || SIZES.md;

  // Defaults based on theme
  const finalBackgroundColor = backgroundColor || colors.primary;
  const finalTitleColor = titleColor || colors.textOnPrimary;
  const finalIconColor = iconColor || finalTitleColor;

  // Determine final values with priority: Props > Size Preset > Defaults
  const finalBorderRadius = borderRadius ?? sSize.container.borderRadius;
  const finalTitleSize = titleSize ? ms(titleSize) : sSize.text.fontSize;
  const finalIconSize = iconSize ? ms(iconSize) : sSize.icon.width;

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={finalTitleColor} />;
    }

    const iconElement = icon ? (
      <Image
        source={icon}
        style={{ width: finalIconSize, height: finalIconSize }}
        resizeMode="contain"
        tintColor={finalIconColor}
      />
    ) : null;

    return (
      <View style={[styles.innerRow, { gap }]}>
        {iconPosition === 'left' && iconElement}
        <Text
          style={[
            styles.baseText,
            {
              fontSize: finalTitleSize,
              fontFamily: titleFont,
              color: finalTitleColor,
            },
            disabled && styles.disabledText,
            textStyle,
          ]}
        >
          {title}
        </Text>
        {iconPosition === 'right' && iconElement}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        sSize.container,
        {
          backgroundColor: finalBackgroundColor,
          borderColor,
          borderWidth,
          borderRadius: finalBorderRadius,
          shadowColor: shadowColor || finalBackgroundColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: shadowOpacity ?? 0.3,
          shadowRadius: shadowRadius ?? ms(10),
          elevation: shadowOpacity ? 8 : 0,
        },
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={activeOpacity}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

// ─── Size Presets (for padding and base scaling) ──────────────
const SIZES = {
  sm: {
    container: { paddingVertical: vs(8), paddingHorizontal: s(16), borderRadius: ms(8) },
    text: { fontSize: ms(13) },
    icon: { width: ms(14) },
  },
  md: {
    container: { paddingVertical: vs(10), paddingHorizontal: s(24), borderRadius: ms(16) },
    text: { fontSize: ms(16) },
    icon: { width: ms(18) },
  },
  lg: {
    container: { paddingVertical: vs(12), paddingHorizontal: s(20), borderRadius: ms(16) },
    text: { fontSize: ms(16) },
    icon: { width: ms(20) },
  },
};

// ─── Base Styles ─────────────────────────────────────────────
const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  baseText: {
    textAlign: 'center',
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

export default CustomButton;
