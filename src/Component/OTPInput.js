import React, { useRef, useMemo } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../Utility/ThemeContext';
import { s, vs, ms } from '../Utility/Scaling';
import Fonts from '../Utility/Fonts';

const { width } = Dimensions.get('window');

const OTPInput = ({ otp, setOtp, digits = 6, hasError = false }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const inputs = useRef([]);
  const [focusedIndex, setFocusedIndex] = React.useState(0);

  const handleChangeText = (val, index) => {
    // Only allow numbers
    const cleanVal = val.replace(/[^0-9]/g, '');

    const newOtp = [...otp];

    if (cleanVal === '') {
      // If deleting, just clear and stay (handleKeyPress will handle back move)
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    // Capture only the last digit (in case of multiple chars)
    const digit = cleanVal.slice(-1);
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-focus next
    if (digit && index < digits - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }, index) => {
    if (key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputs.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  return (
    <View style={styles.container}>
      {otp?.map((digit, i) => {
        const isFocused = focusedIndex === i;
        const isFilled = digit !== '';

        return (
          <View
            key={i}
            style={[
              styles.otpBox,
              (isFocused || isFilled) && styles.otpBoxActive,
              hasError && styles.otpBoxError,
            ]}
          >
            <TextInput
              ref={record => (inputs.current[i] = record)}
              style={[styles.otpInput, isFilled && styles.otpInputFilled]}
              value={digit}
              onChangeText={val => handleChangeText(val, i)}
              onKeyPress={e => handleKeyPress(e, i)}
              onFocus={() => setFocusedIndex(i)}
              keyboardType="number-pad"
              maxLength={1}
              caretHidden
              selectTextOnFocus
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        );
      })}
    </View>
  );
};

const createStyles = colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: s(8),
      width: '100%',
      marginVertical: vs(10),
    },
    otpBox: {
      width: s(46),
      height: vs(54),
      borderRadius: ms(12),
      backgroundColor: colors.card,
      borderWidth: 1.5,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    otpBoxActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryLight,
    },
    otpBoxError: {
      borderColor: colors.error,
      backgroundColor: colors.error + '10',
    },
    otpInput: {
      height: '100%',
      width: '100%',
      textAlign: 'center',
      fontSize: ms(24),
      fontFamily: Fonts.extraBold,
      color: colors.textPrimary,
      padding: 0,
    },
    otpInputFilled: {
      color: colors.primary,
    },
  });

export default OTPInput;
