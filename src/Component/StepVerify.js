import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import OTPInput from './OTPInput';
import SignupStepHeader from './SignupStepHeader';
import { useTheme } from '../Utility/ThemeContext';
import Fonts from '../Utility/Fonts';
import { s, vs, ms } from '../Utility/Scaling';
import { verifyOtp } from '../Utility/api';

const StepVerify = ({ otp, setOtp, onNext, onBack, email, phone }) => {
  const { colors, theme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [selectedMethod, setSelectedMethod] = React.useState('email'); // 'email' or 'sms'
  const [timeLeft, setTimeLeft] = React.useState(300); // 5 minutes in seconds
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleResend = () => {
    // Reset timer to 5 minutes
    setTimeLeft(300);
    setError('');
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length < 6) {
      setError('Please enter the full 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const identifier = selectedMethod === 'email' ? email : phone;
      const response = await verifyOtp(otpString, identifier);

      if (response.ok) {
        onNext();
        setOtp(['', '', '', '', '', '']); // Clear fields on error
      } else {
        setError('OTP does not match or has expired');
        setOtp(['', '', '', '', '', '']); // Clear fields on error
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setOtp(['', '', '', '', '', '']); // Clear fields on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <SignupStepHeader
        title="Verify your identity"
        subtitle="A one-time code has been sent. Select where to receive it."
      />

      <View style={styles.otpMethods}>
        <TouchableOpacity
          style={[
            styles.otpMethod,
            selectedMethod === 'email' && styles.otpMethodActive,
          ]}
          onPress={() => setSelectedMethod('email')}
          activeOpacity={0.7}
        >
          <View style={styles.methodIconContainer}>
            <MaterialIcons
              name={selectedMethod === 'email' ? 'email' : 'mail-outline'}
              size={ms(26)}
              color={
                selectedMethod === 'email'
                  ? colors.primary
                  : colors.textSecondary
              }
            />
          </View>
          <CustomText
            font={Fonts.bold}
            size={ms(14)}
            color={
              selectedMethod === 'email'
                ? colors.textPrimary
                : colors.textSecondary
            }
            style={{ marginTop: vs(8) }}
          >
            Email
          </CustomText>
          <CustomText
            size={ms(11)}
            color={colors.textSecondary}
            style={{ marginTop: vs(2) }}
          >
            {email}
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.otpMethod,
            selectedMethod === 'sms' && styles.otpMethodActive,
          ]}
          onPress={() => setSelectedMethod('sms')}
          activeOpacity={0.7}
        >
          <View style={styles.methodIconContainer}>
            <MaterialIcons
              name={selectedMethod === 'sms' ? 'smartphone' : 'phonelink-setup'}
              size={ms(26)}
              color={
                selectedMethod === 'sms' ? colors.primary : colors.textSecondary
              }
            />
          </View>
          <CustomText
            font={Fonts.bold}
            size={ms(14)}
            color={
              selectedMethod === 'sms'
                ? colors.textPrimary
                : colors.textSecondary
            }
            style={{ marginTop: vs(8) }}
          >
            SMS
          </CustomText>
          <CustomText
            size={ms(11)}
            color={colors.textSecondary}
            style={{ marginTop: vs(2) }}
          >
            {phone}
          </CustomText>
        </TouchableOpacity>
      </View>

      <OTPInput otp={otp} setOtp={setOtp} hasError={!!error} />

      <CustomText
        font={Fonts.medium}
        size={ms(13)}
        color={colors.textSecondary}
        align="center"
      >
        Enter the 6-digit code sent to {'\n'}
        <CustomText font={Fonts.bold} color={colors.textPrimary}>
          {selectedMethod === 'email' ? email : phone}
        </CustomText>
      </CustomText>

      <CustomText
        font={Fonts.medium}
        size={ms(14)}
        color={colors.textSecondary}
        align="center"
        style={{ marginTop: vs(15), marginBottom: vs(5) }}
      >
        Code expires in{' '}
        <CustomText color={colors.warning} font={Fonts.bold}>
          {formatTime(timeLeft)}
        </CustomText>
      </CustomText>

      {error ? (
        <CustomText
          size={ms(12)}
          color={colors.error}
          align="center"
          style={{ marginBottom: vs(10) }}
        >
          {error}
        </CustomText>
      ) : null}

      <CustomButton
        title="Verify & Continue →"
        backgroundColor={colors.primary}
        titleColor={colors.textOnPrimary}
        size="lg"
        fullWidth
        onPress={handleVerify}
        loading={loading}
        disabled={loading}
        style={styles.ctaBtn}
        titleFont={Fonts.extraBold}
      />

      <CustomButton
        title="Resend Code"
        backgroundColor={colors.card}
        borderColor={colors.border}
        borderWidth={1.5}
        titleColor={colors.textPrimary}
        size="lg"
        fullWidth
        onPress={handleResend}
        style={styles.secondaryBtn}
        titleFont={Fonts.bold}
      />

      <CustomButton
        title="← Back"
        backgroundColor="transparent"
        borderColor={colors.border}
        borderWidth={1.5}
        titleColor={colors.textPrimary}
        size="lg"
        fullWidth
        onPress={onBack}
        style={styles.secondaryBtn}
        titleFont={Fonts.bold}
      />
    </Animated.View>
  );
};

const createStyles = colors =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    otpMethods: {
      flexDirection: 'row',
      gap: s(12),
      marginBottom: vs(12),
    },
    otpMethod: {
      flex: 1,
      backgroundColor: colors.cardDark || colors.card,
      borderRadius: ms(20),
      padding: s(16),
      borderWidth: 1.5,
      borderColor: colors.border,
      alignItems: 'center',
    },
    otpMethodActive: {
      borderColor: colors.primary,
      backgroundColor: colors.cardDark || colors.card,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 3,
    },
    methodIconContainer: {
      width: s(40),
      height: s(40),
      justifyContent: 'center',
      alignItems: 'center',
    },
    ctaBtn: {
      marginTop: vs(10),
      borderRadius: ms(12),
      height: vs(42),
    },
    secondaryBtn: {
      marginTop: vs(12),
      borderRadius: ms(12),
      height: vs(42),
    },
  });

export default StepVerify;
