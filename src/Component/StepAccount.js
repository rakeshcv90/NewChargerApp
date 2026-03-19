import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import CustomText from './CustomText';
import CustomInput from './CustomInput';
import SignupStepHeader from './SignupStepHeader';
import { useTheme } from '../Utility/ThemeContext';
import Fonts from '../Utility/Fonts';
import { s, vs, ms } from '../Utility/Scaling';
import CustomButton from './CustomButton';

const StepAccount = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  agreedToTerms,
  setAgreedToTerms,
  onNext,
  onBack,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!phone.trim()) newErrors.phone = 'Phone number is required';

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'Please accept the Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <SignupStepHeader
        title="Create your account"
        subtitle="Personal info to get you started."
      />

      <View style={styles.nameRow}>
        <View style={{ flex: 1 }}>
          <CustomInput
            label="FIRST NAME"
            placeholder="Sarah"
            value={firstName}
            onChangeText={text => {
              setFirstName(text);
              if (errors.firstName)
                setErrors(prev => ({ ...prev, firstName: null }));
            }}
            error={errors.firstName}
          />
        </View>
        <View style={{ flex: 1, marginLeft: s(12) }}>
          <CustomInput
            label="LAST NAME"
            placeholder="Johnson"
            value={lastName}
            onChangeText={text => {
              setLastName(text);
              if (errors.lastName)
                setErrors(prev => ({ ...prev, lastName: null }));
            }}
            error={errors.lastName}
          />
        </View>
      </View>

      <CustomInput
        label="EMAIL ADDRESS"
        placeholder="sarah@email.com"
        value={email}
        onChangeText={text => {
          setEmail(text);
          if (errors.email) setErrors(prev => ({ ...prev, email: null }));
        }}
        keyboardType="email-address"
        error={errors.email}
      />
      <CustomInput
        label="PHONE NUMBER"
        placeholder="+1 (555) 000-0000"
        value={phone}
        onChangeText={text => {
          setPhone(text);
          if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
        }}
        keyboardType="phone-pad"
        error={errors.phone}
      />

      <CustomInput
        label="PASSWORD"
        placeholder="Min. 8 characters"
        value={password}
        onChangeText={text => {
          setPassword(text);
          if (errors.password) setErrors(prev => ({ ...prev, password: null }));
        }}
        secureTextEntry
        error={errors.password}
      />
      <CustomInput
        label="CONFIRM PASSWORD"
        placeholder="Re-enter password"
        value={confirmPassword}
        onChangeText={text => {
          setConfirmPassword(text);
          if (errors.confirmPassword)
            setErrors(prev => ({ ...prev, confirmPassword: null }));
        }}
        secureTextEntry
        error={errors.confirmPassword}
      />

      <TouchableOpacity
        style={styles.termRow}
        activeOpacity={0.7}
        onPress={() => {
          setAgreedToTerms(!agreedToTerms);
          if (errors.terms) setErrors(prev => ({ ...prev, terms: null }));
        }}
      >
        <View
          style={[
            styles.checkboxSmall,
            agreedToTerms && styles.checkboxSmallActive,
            errors.terms && { borderColor: colors.error },
          ]}
        >
          {agreedToTerms && (
            <CustomText
              size={ms(10)}
              font={Fonts.bold}
              color={colors.textOnPrimary}
            >
              ✓
            </CustomText>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <CustomText
            size={ms(12)}
            font={Fonts.medium}
            color={colors.textSecondary}
          >
            I agree to the{' '}
            <CustomText
              size={ms(12)}
              color={colors.primary}
              font={Fonts.semiBold}
            >
              Terms of Service
            </CustomText>{' '}
            and{' '}
            <CustomText
              size={ms(12)}
              color={colors.primary}
              font={Fonts.semiBold}
            >
              Privacy Policy
            </CustomText>
          </CustomText>
          {errors.terms && (
            <CustomText
              size={ms(10)}
              color={colors.error}
              style={{ marginTop: vs(4) }}
            >
              {errors.terms}
            </CustomText>
          )}
        </View>
      </TouchableOpacity>

      <CustomButton
        title="Continue →"
        backgroundColor={colors.primary}
        titleColor={colors.textOnPrimary}
        size="lg"
        fullWidth
        onPress={handleContinue}
        style={styles.ctaBtn}
        titleFont={Fonts.extraBold}
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
        style={styles.backBtn}
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
    nameRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: vs(4),
    },
    termRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: vs(20),
      marginBottom: vs(10),
      gap: s(12),
    },
    checkboxSmall: {
      width: s(20),
      height: s(20),
      borderRadius: ms(5),
      borderWidth: 1.5,
      borderColor: colors.border,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxSmallActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    ctaBtn: {
      marginTop: vs(10),
    },
    backBtn: {
      marginTop: vs(10),
    },
  });

export default StepAccount;
