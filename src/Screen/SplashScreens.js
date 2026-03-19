import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import CustomText from '../Component/CustomText';
import CustomButton from '../Component/CustomButton';
import CustomInput from '../Component/CustomInput';
import Fonts from '../Utility/Fonts';
import { s, vs, ms } from '../Utility/Scaling';
import Image from '../Assets/Images';
import { useTheme } from '../Utility/ThemeContext';

const SplashScreens = ({ navigation }) => {
  const { colors, theme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();
  
  const [activeTab, setActiveTab] = useState('signup');
  const [toggleWidth, setToggleWidth] = useState(0);
  const tabOffset = useSharedValue(activeTab === 'login' ? 0 : 1);

  // Constants for indicator
  const INDICATOR_PADDING = ms(4);

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    const errors = {};
    if (!loginEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(loginEmail)) {
      errors.email = 'Enter a valid email address';
    }
    if (!loginPassword.trim()) {
      errors.password = 'Password is required';
    } else if (loginPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    setLoginErrors(errors);
    if (Object.keys(errors).length === 0) {
      navigation.navigate('Home');
    }
  };

  const handleSocialLogin = () => {
    navigation.navigate('Home');
  };

  const switchTab = tab => {
    setActiveTab(tab);

    tabOffset.value = withSpring(tab === 'login' ? 0 : 1, {
      damping: 25,
      stiffness: 180,
    });
    setLoginErrors({});
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    if (!toggleWidth) return { width: 0, transform: [{ translateX: 0 }] };
    
    // Use the pre-calculated INDICATOR_PADDING (calculated on the JS thread)
    const buttonWidth = (toggleWidth - (INDICATOR_PADDING * 2)) / 2;
    
    return {
      width: buttonWidth,
      transform: [
        {
          translateX: tabOffset.value * buttonWidth,
        },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + vs(20) }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {activeTab === 'signup' && (
            <Animated.View
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(400)}
              style={{ width: '100%' }}
            >
              <View style={styles.logoContainer}>
                <View style={styles.logoGlow}>
                  <View style={styles.logoCircle}>
                    <Text style={styles.logoLightning}>⚡</Text>
                  </View>
                </View>
              </View>

              <View style={styles.textSection}>
                <CustomText
                  font={Fonts.bold}
                  size={12}
                  color={colors.textSecondary}
                  style={[
                    styles.brandTitle,
                    { letterSpacing: 2, textTransform: 'uppercase' },
                  ]}
                >
                  TRO ENERGY SOLUTIONS
                </CustomText>
                
                <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <CustomText
                    size={vs(35)}
                    font={Fonts.extraBold}
                    style={styles.heroText}
                    color={colors.textPrimary}
                  >
                    Charge{' '}
                  </CustomText>
                  <CustomText
                    size={vs(35)}
                    font={Fonts.extraBold}
                    color={colors.textPrimary}
                    style={styles.heroText}
                  >
                    smarter.
                  </CustomText>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <CustomText
                    size={vs(35)}
                    font={Fonts.extraBold}
                    color={colors.primary}
                    style={styles.heroText}
                  >
                    Drive{' '}
                  </CustomText>
                  <CustomText
                    size={vs(35)}
                    font={Fonts.extraBold}
                    style={styles.heroText}
                    color={colors.primary}
                  >
                    farther.
                  </CustomText>
                </View>

                <CustomText
                  size={vs(14)}
                  font={Fonts.medium}
                  color={colors.textSecondary}
                  align="center"
                  style={styles.subText}
                >
                  Residential EV charging made simple —
                </CustomText>
                <CustomText
                  size={vs(13)}
                  font={Fonts.medium}
                  color={colors.textSecondary}
                  align="center"
                  style={[styles.subText, { marginTop: 4 }]}
                >
                  sign up in minutes.
                </CustomText>
              </View>
            </Animated.View>
          )}

          {/* ─── Login Form ─── */}

          {activeTab === 'login' && (
            <Animated.View
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(400)}
              style={{ width: '100%' }}
            >
              <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                  <CustomInput
                    label="EMAIL ADDRESS"
                    placeholder="you@email.com"
                    value={loginEmail}
                    onChangeText={text => {
                      setLoginEmail(text);
                      if (loginErrors.email) {
                        setLoginErrors(prev => ({ ...prev, email: null }));
                      }
                    }}
                    keyboardType="email-address"
                    error={loginErrors.email}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <CustomInput
                    label="PASSWORD"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChangeText={text => {
                      setLoginPassword(text);
                      if (loginErrors.password) {
                        setLoginErrors(prev => ({ ...prev, password: null }));
                      }
                    }}
                    secureTextEntry
                    error={loginErrors.password}
                  />
                </View>

                {/* Remember Me + Forgot Password */}
                <View style={styles.optionsRow}>
                  <TouchableOpacity
                    style={styles.rememberRow}
                    onPress={() => setRememberMe(!rememberMe)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        rememberMe && styles.checkboxActive,
                      ]}
                    >
                      {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <CustomText
                      size={13}
                      font={Fonts.medium}
                      color={colors.textSecondary}
                    >
                      Remember me
                    </CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <CustomText
                      size={13}
                      font={Fonts.medium}
                      color={colors.primary}
                    >
                      Forgot password?
                    </CustomText>
                  </TouchableOpacity>
                </View>

                {/* Login CTA */}
                <View style={styles.inputWrapper}>
                  <CustomButton
                    title="Log In"
                    backgroundColor={colors.primary}
                    titleColor={colors.textOnPrimary}
                    size="lg"
                    fullWidth
                    onPress={handleLogin}
                    style={styles.ctaBtn}
                  />
                </View>
              </View>
            </Animated.View>
          )}

          <View
            style={styles.authToggle}
            onLayout={e => setToggleWidth(e.nativeEvent.layout.width)}
          >
            <Animated.View
              style={[styles.activeIndicator, animatedIndicatorStyle]}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.toggleBtn}
              onPress={() => switchTab('login')}
            >
              <CustomText
                size={15}
                font={Fonts.bold}
                color={
                  activeTab === 'login' ? colors.textOnPrimary : colors.textSecondary
                }
                align="center"
              >
                Log In
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.toggleBtn}
              onPress={() => switchTab('signup')}
            >
              <CustomText
                size={15}
                font={Fonts.bold}
                color={
                  activeTab === 'signup' ? colors.textOnPrimary : colors.textSecondary
                }
                align="center"
              >
                Sign Up
              </CustomText>
            </TouchableOpacity>
          </View>

          {activeTab === 'signup' && (
            <Animated.View
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(400)}
              style={styles.inputWrapper}
            >
              <CustomButton
                title="Create Account →"
                backgroundColor={colors.primary}
                titleColor={colors.textOnPrimary}
                size="lg"
                fullWidth
                onPress={() => navigation.navigate('SignUp')}
                style={styles.createBtn}
                titleFont={Fonts.extraBold}
              />
            </Animated.View>
          )}

          {/* Divider & Social Buttons */}
          <View style={{ width: '100%' }}>
            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <CustomText
                font={Fonts.semiBold}
                size={11}
                color={colors.textSecondary}
                style={[
                  styles.dividerText,
                  { letterSpacing: 2, textTransform: 'uppercase' },
                ]}
              >
                OR CONTINUE WITH
              </CustomText>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={[styles.socialContainer, { width: '95%', alignSelf: 'center' }]}>
              <CustomButton
                title="Continue with Google"
                backgroundColor={colors.inputBg}
                borderColor={colors.inputBorder}
                borderWidth={1}
                titleColor={colors.textPrimary}
                size="lg"
                fullWidth
                titleSize={15}
                icon={Image.GOOGLE}
                onPress={handleSocialLogin}
              />
              <CustomButton
                title="Continue with Apple"
                backgroundColor={colors.inputBg}
                borderColor={colors.inputBorder}
                borderWidth={1}
                titleSize={15}
                titleColor={colors.textPrimary}
                size="lg"
                fullWidth
                icon={Image.APPLE}
                iconColor={colors.textPrimary}
                onPress={handleSocialLogin}
              />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <CustomText size={12} color={colors.textMuted} align="center">
              By continuing, you agree to our{' '}
              <CustomText
                size={12}
                color={colors.primary}
                font={Fonts.semiBold}
              >
                Terms of Service
              </CustomText>{' '}
              and{' '}
              <CustomText
                size={12}
                color={colors.primary}
                font={Fonts.semiBold}
              >
                Privacy Policy
              </CustomText>
            </CustomText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const createStyles = colors => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: s(24),
    paddingVertical: vs(15),
    alignItems: 'center',
  },
  // Logo
  logoContainer: {
    alignItems: 'center',
    marginTop: vs(15),
    marginBottom: vs(15),
  },
  logoGlow: {
    width: s(100),
    height: s(100),
    borderRadius: s(50),
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: ms(12),
    elevation: 8,
  },
  logoCircle: {
    width: s(72),
    height: s(72),
    borderRadius: s(36),
    borderWidth: ms(4),
    borderColor: colors.primary,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLightning: {
    fontSize: ms(26),
    color: colors.primary,
  },
  // Text
  textSection: {
    alignItems: 'center',
    marginBottom: vs(10),
  },
  brandTitle: {
    marginBottom: vs(12),
  },
  heroText: {
    lineHeight: ms(42),
    textAlign: 'center',
  },
  subText: {
    marginTop: vs(8),
  },
  // Form
  formContainer: {
    width: '100%',
    marginVertical: vs(10),
    alignItems: 'stretch',
  },
  inputWrapper: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: vs(12),
  },
  optionsRow: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(15),
    marginTop: vs(2),
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  checkbox: {
    width: s(20),
    height: s(20),
    borderRadius: ms(5),
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.textOnPrimary,
    fontSize: ms(12),
    fontWeight: '800',
  },
  ctaBtn: {
    marginTop: vs(5),
  },
  createBtn: {
    marginTop: vs(10),
  },
  // Auth Toggle
  authToggle: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    marginTop: vs(20),
    marginBottom: vs(15),
    borderRadius: ms(18),
    backgroundColor: colors.inputBg,
    padding: ms(4),
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: ms(4),
    left: ms(4),
    bottom: ms(4),
    backgroundColor: colors.primary,
    borderRadius: ms(14),
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: vs(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(14),
    zIndex: 1,
  },
  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '92%',
    alignSelf: 'center',
    marginVertical: vs(15),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: ms(10),
    marginHorizontal: s(12),
  },
  // Social
  socialContainer: {
    width: '100%',
    gap: vs(12),
  },
  // Footer
  footer: {
    marginTop: vs(20),
    marginBottom: vs(15),
    paddingHorizontal: s(10),
  },
});

export default SplashScreens;
