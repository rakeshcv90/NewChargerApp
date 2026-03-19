import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTheme } from '../Utility/ThemeContext';
// Components
import StepAccount from '../Component/StepAccount';
import StepDetails from '../Component/StepDetails';
import StepVerify from '../Component/StepVerify';
import StepEnergyPlan from '../Component/StepEnergyPlan';
import BottomTab from '../Component/BottomTab';

// Utilities
import Fonts from '../Utility/Fonts';
import { s, vs, ms } from '../Utility/Scaling';

const { width } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  const { colors, theme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('Home');

  // --- Step 0: Account Info ---
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // --- Step 1: Your Details ---
  const [status, setStatus] = useState('');
  const [installation, setInstallation] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [unit, setUnit] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      vehicleType: 'Battery Electric Vehicle (EV)',
      make: '',
      model: '',
      year: '',
      licensePlate: '',
    },
  ]);

  const [scrollEnabled, setScrollEnabled] = useState(true);

  // --- Step 2: Verify Identity ---
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // --- Step 3: Energy Plan ---
  const [kwh, setKwh] = useState(300);
  const [bidirectional, setBidirectional] = useState(false);
  const [communityCharging, setCommunityCharging] = useState(false);

  // --- Handlers ---
  const handleNext = () => {
    console.log('handleNext | Current Step:', currentStep);
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('Home');
    }
  };

  const handleBack = () => {
    console.log('handleBack | Current Step:', currentStep);
    if (currentStep > 0) {
      if (currentStep === 1) {
        // Clear OTP when moving back from Verify screen
        setOtp(['', '', '', '', '', '']);
      }
      setCurrentStep(currentStep - 1);
      return true; // Prevent default back behavior
    } else {
      console.log('handleBack | Navigating Back to previous screen');
      navigation.goBack();
      return true;
    }
  };

  // Handle hardware back button
  useEffect(() => {
    const backAction = () => {
      return handleBack();
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [currentStep]); // Re-bind when step changes to have correct closure

  const handleTabPress = tabKey => {
    setActiveTab(tabKey);
  };

  // --- Components ---
  const StepIndicator = () => (
    <View style={styles.indicatorContainer}>
      {[0, 1, 2, 3, 4, 5].map((_, i) => (
        <View
          key={i}
          style={[
            styles.indicatorDot,
            i === currentStep && styles.indicatorDotActive,
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          scrollEnabled={scrollEnabled}
        >
          <StepIndicator />

          {currentStep === 0 && (
            <StepAccount
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              agreedToTerms={agreedToTerms}
              setAgreedToTerms={setAgreedToTerms}
              onNext={handleNext}
              onBack={() => navigation.goBack()}
            />
          )}
          {currentStep === 1 && (
            <StepVerify
              otp={otp}
              setOtp={setOtp}
              onNext={handleNext}
              onBack={handleBack}
              email={email}
              phone={phone}
            />
          )}
          {currentStep === 2 && (
            <StepDetails
              firstName={firstName}
              lastName={lastName}
              email={email}
              phone={phone}
              status={status}
              setStatus={setStatus}
              installation={installation}
              setInstallation={setInstallation}
              streetAddress={streetAddress}
              setStreetAddress={setStreetAddress}
              unit={unit}
              setUnit={setUnit}
              zipCode={zipCode}
              setZipCode={setZipCode}
              city={city}
              setCity={setCity}
              state={state}
              setState={setState}
              vehicles={vehicles}
              setVehicles={setVehicles}
              onNext={handleNext}
              onBack={handleBack}
              setIsScrollEnabled={setScrollEnabled}
            />
          )}

          {currentStep === 3 && (
            <StepEnergyPlan
              kwh={kwh}
              setKwh={setKwh}
              bidirectional={bidirectional}
              setBidirectional={setBidirectional}
              communityCharging={communityCharging}
              setCommunityCharging={setCommunityCharging}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const createStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: s(10),
      paddingBottom: vs(40),
      paddingTop: vs(10),
    },
    indicatorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: s(6),
      marginBottom: vs(24),
    },
    indicatorDot: {
      width: s(6),
      height: s(6),
      borderRadius: s(3),
      backgroundColor: colors.border,
    },
    indicatorDotActive: {
      width: s(24),
      height: s(6),
      borderRadius: s(3),
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
    },
    headerIconContainer: {
      alignItems: 'flex-start',
      marginBottom: vs(16),
    },
    headerIconGlow: {
      width: s(42),
      height: s(42),
      borderRadius: ms(12),
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: ms(10),
      elevation: 10,
    },
    stepContainer: {
      width: '100%',
    },
    titleSection: {
      marginBottom: vs(24),
    },
    stepTitle: {
      lineHeight: vs(38),
      marginBottom: vs(4),
    },
    stepSub: {
      marginTop: vs(4),
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
      marginTop: vs(24),
    },
    backBtn: {
      marginTop: vs(12),
    },
    sectionDivider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: vs(20),
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerLabel: {
      paddingHorizontal: s(12),
      letterSpacing: 1.2,
    },
    vehicleCard: {
      backgroundColor: colors.cardDark || colors.card,
      borderRadius: ms(20),
      padding: s(16),
      borderWidth: 1,
      borderColor: colors.border,
    },
    vehicleCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: vs(16),
    },
    evBadge: {
      backgroundColor: colors.primaryLight,
      paddingHorizontal: s(8),
      paddingVertical: vs(2),
      borderRadius: ms(6),
      borderWidth: 1,
      borderColor: colors.primary + '33',
    },
    addVehicleBtn: {
      width: '100%',
      height: vs(50),
      borderRadius: ms(16),
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: vs(16),
    },
    otpMethods: {
      flexDirection: 'row',
      gap: s(12),
      marginBottom: vs(32),
    },
    otpMethod: {
      flex: 1,
      backgroundColor: colors.cardDark || colors.card,
      borderRadius: ms(16),
      padding: s(16),
      borderWidth: 1,
      borderColor: colors.border,
    },
    otpMethodActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryLight,
    },
    resendBtn: {
      alignSelf: 'center',
      marginTop: vs(20),
    },
    planCard: {
      backgroundColor: colors.cardDark || colors.card,
      borderRadius: ms(24),
      padding: s(24),
      borderWidth: 1,
      borderColor: colors.primary + '4D',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 5,
    },
    planRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: vs(16),
    },
    planDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: vs(20),
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sliderContainer: {
      marginTop: vs(32),
    },
    sliderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: vs(16),
    },
    sliderTrack: {
      height: vs(6),
      backgroundColor: colors.border,
      borderRadius: 3,
      position: 'relative',
    },
    sliderFill: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 3,
    },
    sliderThumb: {
      width: s(24),
      height: s(24),
      borderRadius: s(12),
      backgroundColor: colors.primary,
      borderWidth: 4,
      borderColor: colors.background,
      position: 'absolute',
      top: -vs(9),
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 4,
    },
    sliderLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: vs(12),
    },
  });

export default SignUpScreen;
