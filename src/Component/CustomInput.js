import React, { useState, useMemo } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Fonts from '../Utility/Fonts';
import { s, vs, ms } from '../Utility/Scaling';
import { useTheme } from '../Utility/ThemeContext';

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  editable = true,
  maxLength,
  multiline = false,
  numberOfLines,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
  inputContainerStyle,
  isDropdown = false,
  ...rest
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isSecure = secureTextEntry && !isPasswordVisible;

  const InputWrapper = isDropdown && rest.onPress ? TouchableOpacity : View;

  return (
    <View style={[styles.container, style]}>
      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Input Row */}
      <InputWrapper
        onPress={rest.onPress}
        activeOpacity={0.7}
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          !editable && styles.inputDisabled,
          inputContainerStyle,
        ]}
      >
        {leftIcon && <Text style={styles.leftIcon}>{leftIcon}</Text>}

        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={isDropdown ? false : editable}
          pointerEvents={isDropdown ? 'none' : 'auto'}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.rightIconBtn}
          >
            <Text style={styles.rightIcon}>
              {isPasswordVisible ? '👁️' : '🔒'}
            </Text>
          </TouchableOpacity>
        )}

        {rightIcon && !secureTextEntry && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIconBtn}
            disabled={!onRightIconPress}
          >
            <Text style={styles.rightIcon}>{rightIcon}</Text>
          </TouchableOpacity>
        )}

        {isDropdown && (
          <View style={styles.rightIconBtn}>
            <Text
              style={[
                styles.rightIcon,
                { fontSize: ms(14), color: colors.textSecondary },
              ]}
            >
              ▼
            </Text>
          </View>
        )}
      </InputWrapper>

      {/* Validation Error */}
      {error && (
        <View style={styles.errorRow}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const createStyles = (colors) => StyleSheet.create({
  container: {
    marginBottom: vs(14),
  },
  label: {
    color: colors.textSecondary,
    fontSize: ms(11),
    fontFamily: Fonts.semiBold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: vs(8),
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: s(4), // Subtle left inset
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: ms(12),
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    paddingHorizontal: s(16),
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1.5,
  },
  inputDisabled: {
    opacity: 0.5,
  },
  leftIcon: {
    fontSize: ms(16),
    marginRight: s(10),
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: ms(15),
    paddingVertical: vs(12),
    fontFamily: Fonts.regular,
  },
  rightIconBtn: {
    padding: s(6),
    marginLeft: s(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    fontSize: ms(16),
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(6),
    gap: s(4),
  },
  errorIcon: {
    fontSize: ms(12),
  },
  errorText: {
    color: colors.error,
    fontSize: ms(12),
    fontFamily: Fonts.medium,
  },
});

export default CustomInput;
