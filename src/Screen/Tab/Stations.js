import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import CustomText from '../../Component/CustomText';
import CustomInput from '../../Component/CustomInput';
import CustomButton from '../../Component/CustomButton';
import Fonts from '../../Utility/Fonts';
import { s, vs, ms } from 'react-native-size-matters';
import { useTheme } from '../../Utility/ThemeContext';

const formatCardNumber = raw => {
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
};

const formatExpiry = raw => {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
};

const buildCardDisplay = raw => {
  const digits = raw.replace(/\D/g, '');
  const groups = [];
  for (let i = 0; i < 4; i++) {
    const chunk = digits.slice(i * 4, i * 4 + 4);
    const padded = chunk.padEnd(4, '•');
    groups.push(padded);
  }
  return groups.join('  ');
};

const detectCardType = digits => {
  if (!digits) return null;
  const n = parseInt(digits.slice(0, 4), 10);

  if (digits[0] === '4') {
    return { type: 'visa', name: 'Visa', accentColor: '#1A6BC4' };
  }

  const first2 = parseInt(digits.slice(0, 2), 10);
  if ((first2 >= 51 && first2 <= 55) || (n >= 2221 && n <= 2720)) {
    return { type: 'mastercard', name: 'Mastercard', accentColor: '#EB5757' };
  }

  const first3 = parseInt(digits.slice(0, 3), 10);
  if (
    digits.startsWith('60') ||
    digits.startsWith('6521') ||
    digits.startsWith('6522') ||
    digits.startsWith('81') ||
    digits.startsWith('82') ||
    first3 === 508
  ) {
    return { type: 'rupay', name: 'RuPay', accentColor: '#F48024' };
  }

  return null; // unrecognised
};

const VisaLogo = ({ colors }) => (
  <View style={logoStyles(colors).visaWrap}>
    <View style={logoStyles(colors).visaAccent} />
    <CustomText
      size={18}
      font={Fonts.extraBold}
      color="#1A1F71"
      style={{ letterSpacing: 1, fontStyle: 'italic', zIndex: 1 }}
    >
      VISA
    </CustomText>
  </View>
);

const MastercardLogo = ({ colors }) => (
  <View style={logoStyles(colors).mcWrap}>
    <View style={logoStyles(colors).mcCircles}>
      <View style={logoStyles(colors).mcLeft} />
      <View style={logoStyles(colors).mcRight} />
    </View>
    <CustomText
      size={7}
      font={Fonts.bold}
      color="#FFFFFF"
      style={{ letterSpacing: 0.3, marginTop: vs(3) }}
    >
      mastercard
    </CustomText>
  </View>
);

const RuPayLogo = ({ colors }) => (
  <View style={logoStyles(colors).rupayWrap}>
    <CustomText
      size={15}
      font={Fonts.extraBold}
      color="#002E6E"
      style={{ letterSpacing: -0.3, fontStyle: 'italic' }}
    >
      RuPay
    </CustomText>

    <View style={logoStyles(colors).rupayArrows}>
      <View style={[logoStyles(colors).rupayArrow, logoStyles(colors).rupayArrowGreen]} />
      <View
        style={[
          logoStyles(colors).rupayArrow,
          logoStyles(colors).rupayArrowOrange,
          { marginLeft: -s(6) },
        ]}
      />
    </View>
  </View>
);

const CardBrandLogo = ({ type, colors }) => {
  if (type === 'visa') return <VisaLogo colors={colors} />;
  if (type === 'mastercard') return <MastercardLogo colors={colors} />;
  if (type === 'rupay') return <RuPayLogo colors={colors} />;
  return null;
};

const logoStyles = colors => StyleSheet.create({
  visaWrap: {
    backgroundColor: '#FFFFFF',
    borderRadius: ms(6),
    paddingHorizontal: s(10),
    paddingVertical: vs(5),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  visaAccent: {
    position: 'absolute',
    top: -vs(2),
    left: -s(2),
    width: s(18),
    height: s(18),
    backgroundColor: '#F7B600',
    borderRadius: ms(2),
    transform: [
      { rotate: '45deg' },
      { translateX: -s(8) },
      { translateY: -s(8) },
    ],
  },
  mcWrap: {
    backgroundColor: '#0A0A0A',
    borderRadius: ms(8),
    paddingHorizontal: s(8),
    paddingVertical: vs(5),
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#333333',
  },
  mcCircles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mcLeft: {
    width: s(20),
    height: s(20),
    borderRadius: s(10),
    backgroundColor: '#EB001B',
  },
  mcRight: {
    width: s(20),
    height: s(20),
    borderRadius: s(10),
    backgroundColor: '#F79E1B',
    marginLeft: -s(8),
  },
  rupayWrap: {
    backgroundColor: '#FFFFFF',
    borderRadius: ms(6),
    paddingHorizontal: s(8),
    paddingVertical: vs(5),
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(4),
  },
  rupayArrows: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: s(2),
  },
  rupayArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: s(9),
    borderBottomWidth: s(9),
    borderLeftWidth: s(11),
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  rupayArrowGreen: {
    borderLeftColor: '#00843D',
  },
  rupayArrowOrange: {
    borderLeftColor: '#FF6600',
  },
});

const Stations = () => {
  const { colors, theme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [sameBilling, setSameBilling] = useState(true);
  const insets = useSafeAreaInsets();

  const [errors, setErrors] = useState({});

  const handleCardNumber = text => {
    const formatted = formatCardNumber(text);
    setCardNumber(formatted);
    if (errors.cardNumber) setErrors(e => ({ ...e, cardNumber: null }));
  };

  const handleExpiry = text => {
    const raw = text.replace(/\D/g, '');
    setExpiry(formatExpiry(raw));
    if (errors.expiry) setErrors(e => ({ ...e, expiry: null }));
  };

  const rawDigits = cardNumber.replace(/\D/g, '');
  const cardType = detectCardType(rawDigits);

  const cardTypeError =
    rawDigits.length === 16 && !cardType
      ? 'Unsupported card. Please use Visa, Mastercard, or RuPay.'
      : null;

  const cardError = cardTypeError || errors.cardNumber || null;

  const handleSubmit = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Please enter the name on card.';
    if (!rawDigits) newErrors.cardNumber = 'Please enter your card number.';
    else if (rawDigits.length < 16)
      newErrors.cardNumber = 'Card number must be 16 digits.';
    else if (cardTypeError) newErrors.cardNumber = cardTypeError;
    if (!expiry || expiry.replace(/\D/g, '').length < 4)
      newErrors.expiry = 'Please enter a valid expiry date.';
    if (!cvv || cvv.length < 3) newErrors.cvv = 'Please enter your CVV.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log('Activate Plan');
  };

  const displayCardNumber = buildCardDisplay(cardNumber);
  const displayName = name.trim().toUpperCase() || 'YOUR NAME';
  const displayExpiry = expiry || 'MM / YY';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: vs(160) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <CustomText size={32} font={Fonts.extraBold} color={colors.textPrimary}>
          Payment
        </CustomText>
        <CustomText
          size={14}
          color={colors.textSecondary}
          style={styles.subtitle}
        >
          Your card is encrypted and stored securely.
        </CustomText>

        <View style={styles.creditCard}>
          <View style={styles.cardHeader}>
            <View style={styles.chip} />
            {cardType ? (
              <CardBrandLogo type={cardType.type} colors={colors} />
            ) : (
              <View style={styles.logoMark}>
                <View style={styles.logoCircleLeft} />
                <View style={styles.logoCircleRight} />
              </View>
            )}
          </View>

          <CustomText
            size={19}
            font={Fonts.bold}
            color="#FFFFFF"
            style={styles.cardNumberMask}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {displayCardNumber}
          </CustomText>

          <View style={styles.cardFooter}>
            <View style={{ flex: 1, paddingRight: s(10) }}>
              <CustomText
                size={10}
                font={Fonts.bold}
                color="rgba(255,255,255,0.7)"
                style={{ marginBottom: vs(2), letterSpacing: 1 }}
              >
                CARD HOLDER
              </CustomText>
              <CustomText
                size={13}
                font={Fonts.bold}
                color="#FFFFFF"
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {displayName}
              </CustomText>
            </View>

            <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
              <CustomText
                size={10}
                font={Fonts.bold}
                color="rgba(255,255,255,0.7)"
                style={{ marginBottom: vs(2), letterSpacing: 1 }}
              >
                EXPIRES
              </CustomText>
              <CustomText
                size={13}
                font={Fonts.bold}
                color="#FFFFFF"
                style={{ letterSpacing: 1 }}
              >
                {displayExpiry}
              </CustomText>
            </View>
          </View>

          <View style={styles.cardShine} />
        </View>

        <View style={styles.securityBadge}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomText
              size={12}
              color="#FFB800"
              style={{ marginRight: s(6), marginTop: vs(-2) }}
            >
              🔒
            </CustomText>
            <CustomText size={12} font={Fonts.bold} color={colors.textSecondary}>
              256-bit SSL Encrypted · PCI DSS Compliant
            </CustomText>
          </View>
        </View>

        <CustomInput
          label="NAME ON CARD"
          placeholder="Sarah Johnson"
          value={name}
          onChangeText={v => {
            setName(v);
            if (errors.name) setErrors(e => ({ ...e, name: null }));
          }}
          autoCapitalize="words"
          error={errors.name}
          inputContainerStyle={[
            styles.customInputContainer,
            errors.name && { borderColor: colors.error },
          ]}
          style={{ marginBottom: vs(20) }}
        />
        <CustomInput
          label="CARD NUMBER"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChangeText={handleCardNumber}
          keyboardType="number-pad"
          maxLength={19}
          rightIcon={cardType ? undefined : '💳'}
          error={cardError}
          inputContainerStyle={[
            styles.customInputContainer,
            cardError && { borderColor: colors.error },
          ]}
          style={{ marginBottom: cardError ? vs(8) : vs(20) }}
        />

        <View style={styles.rowInputs}>
          <View style={{ flex: 1 }}>
            <CustomInput
              label="EXPIRY DATE"
              placeholder="MM / YY"
              value={expiry}
              onChangeText={handleExpiry}
              keyboardType="number-pad"
              maxLength={7}
              error={errors.expiry}
              inputContainerStyle={[
                styles.customInputContainer,
                errors.expiry && { borderColor: colors.error },
              ]}
            />
          </View>
          <View style={{ flex: 1 }}>
            <CustomInput
              label="CVV"
              placeholder="•••"
              value={cvv}
              onChangeText={v => {
                setCvv(v);
                if (errors.cvv) setErrors(e => ({ ...e, cvv: null }));
              }}
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
              error={errors.cvv}
              inputContainerStyle={[
                styles.customInputContainer,
                errors.cvv && { borderColor: colors.error },
              ]}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setSameBilling(!sameBilling)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, sameBilling && styles.checkboxActive]}>
            {sameBilling && (
              <CustomText
                size={12}
                font={Fonts.bold}
                color={colors.textOnPrimary}
                style={{ marginTop: vs(1) }}
              >
                ✓
              </CustomText>
            )}
          </View>
          <CustomText size={14} color={colors.textSecondary}>
            Billing address same as residential
          </CustomText>
        </TouchableOpacity>

        <View style={styles.summaryCard}>
          <CustomText
            size={13}
            font={Fonts.bold}
            color={colors.textSecondary}
            style={{ marginBottom: vs(18) }}
          >
            ORDER SUMMARY
          </CustomText>

          <View style={styles.summaryRow}>
            <CustomText size={14} color={colors.textSecondary}>
              Plan — 300 kWh/mo
            </CustomText>
            <CustomText size={14} font={Fonts.bold} color={colors.textPrimary}>
              $78.90
            </CustomText>
          </View>
          <View style={styles.summaryRow}>
            <CustomText size={14} color={colors.textSecondary}>
              Est. Tax (8.25%)
            </CustomText>
            <CustomText size={14} font={Fonts.bold} color={colors.textPrimary}>
              $6.51
            </CustomText>
          </View>

          <View style={styles.totalRow}>
            <CustomText size={18} font={Fonts.extraBold} color={colors.textPrimary}>
              Due Today
            </CustomText>
            <CustomText size={18} font={Fonts.extraBold} color={colors.success}>
              $85.41
            </CustomText>
          </View>
        </View>

        <View style={{ marginTop: vs(30) }}>
          <CustomButton
            title="Activate Plan – $85.41 / mo →"
            backgroundColor={colors.primary}
            titleColor={colors.textOnPrimary}
            size="lg"
            fullWidth
            titleFont={Fonts.extraBold}
            style={{ marginBottom: vs(15) }}
            onPress={handleSubmit}
          />

          <CustomButton
            title="← Back"
            backgroundColor="transparent"
            titleColor={colors.textPrimary}
            size="lg"
            fullWidth
            titleFont={Fonts.bold}
            style={{
              borderWidth: 1,
              borderColor: colors.border,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = colors => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: s(10),
    paddingTop: vs(20),
  },
  subtitle: {
    marginTop: vs(5),
    marginBottom: vs(25),
  },

  /* ── Card ── */
  creditCard: {
    backgroundColor: '#1B1B2F',
    borderRadius: ms(24),
    padding: s(24),
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: vs(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
    overflow: 'hidden',
  },
  cardShine: {
    position: 'absolute',
    top: -vs(40),
    right: -s(20),
    width: s(120),
    height: vs(180),
    backgroundColor: 'rgba(255,255,255,0.05)',
    transform: [{ rotate: '25deg' }],
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: vs(25),
  },
  chip: {
    width: s(40),
    height: vs(28),
    backgroundColor: '#FFD700',
    borderRadius: ms(6),
  },
  logoMark: {
    flexDirection: 'row',
    alignItems: 'center',
    width: s(46),
    height: vs(28),
  },
  logoCircleLeft: {
    width: s(26),
    height: s(26),
    borderRadius: s(13),
    backgroundColor: '#EB001B',
    opacity: 0.9,
  },
  logoCircleRight: {
    width: s(26),
    height: s(26),
    borderRadius: s(13),
    backgroundColor: '#F79E1B',
    opacity: 0.85,
    marginLeft: -s(10),
  },
  cardNumberMask: {
    letterSpacing: 3,
    marginBottom: vs(25),
    fontVariant: ['tabular-nums'],
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },

  /* ── Security ── */
  securityBadge: {
    backgroundColor: colors.card,
    borderRadius: ms(10),
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: vs(16),
    alignItems: 'center',
    marginBottom: vs(30),
  },

  /* ── Form ── */
  rowInputs: {
    flexDirection: 'row',
    gap: s(15),
  },
  customInputContainer: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: ms(10),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(5),
    marginBottom: vs(30),
  },
  checkbox: {
    width: ms(22),
    height: ms(22),
    borderRadius: ms(6),
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: s(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxActive: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },

  /* ── Summary ── */
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: ms(20),
    borderWidth: 1,
    borderColor: colors.border,
    padding: s(24),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(16),
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vs(6),
    paddingTop: vs(20),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});

export default Stations;
