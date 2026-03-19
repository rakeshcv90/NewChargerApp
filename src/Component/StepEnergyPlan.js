import React, { useMemo } from 'react';
import { View, StyleSheet, PanResponder, Switch } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import SignupStepHeader from './SignupStepHeader';
import { useTheme } from '../Utility/ThemeContext';
import Fonts from '../Utility/Fonts';
import { s, vs, ms } from '../Utility/Scaling';

const StepEnergyPlan = ({
  kwh,
  setKwh,
  bidirectional,
  setBidirectional,
  communityCharging,
  setCommunityCharging,
  onNext,
  onBack,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [sliderWidth, setSliderWidth] = React.useState(0);
  const minKwh = 25;
  const maxKwh = 1000;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newX = gestureState.moveX - s(20); // Adjust for container padding
        const progress = Math.min(Math.max(newX / sliderWidth, 0), 1);
        const newKwh = Math.round(minKwh + (maxKwh - minKwh) * progress);
        setKwh(newKwh);
      },
    }),
  ).current;

  // Constants for calculation
  const MILES_PER_KWH = 3.5;
  const RATE_PER_KWH = 0.15; // $0.15 per kWh as a base
  const TAX_RATE = 0.0825;

  // Calculations
  const milesEquivalent = Math.round(kwh * MILES_PER_KWH);
  const costPerMile = (RATE_PER_KWH / MILES_PER_KWH).toFixed(3);
  const monthlyRate = (kwh * RATE_PER_KWH).toFixed(2);
  const estTax = (parseFloat(monthlyRate) * TAX_RATE).toFixed(2);

  // Optional add-ons costs (can be adjusted as needed)
  const bidirectionalCost = bidirectional ? 10.0 : 0.0;
  const communityChargingCost = communityCharging ? 5.0 : 0.0;

  const monthlyTotal = (
    parseFloat(monthlyRate) +
    parseFloat(estTax) +
    bidirectionalCost +
    communityChargingCost
  ).toFixed(2);

  const sliderProgress = (kwh - minKwh) / (maxKwh - minKwh);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <SignupStepHeader
        title="Your energy plan"
        subtitle="Slide to set your monthly kWh. Your price updates instantly."
      />

      <View style={styles.planCard}>
        <CustomText
          font={Fonts.bold}
          size={ms(10)}
          color={colors.textSecondary}
          align="center"
          style={{ letterSpacing: 1.5 }}
        >
          MONTHLY ESTIMATE
        </CustomText>

        <View style={styles.planRow}>
          <CustomText font={Fonts.medium} color={colors.textSecondary}>
            Monthly kWh
          </CustomText>
          <CustomText
            font={Fonts.extraBold}
            size={ms(22)}
            color={colors.primary}
          >
            {kwh}{' '}
            <CustomText font={Fonts.bold} size={ms(14)}>
              kWh
            </CustomText>
          </CustomText>
        </View>

        <View style={styles.planRow}>
          <CustomText font={Fonts.medium} color={colors.textSecondary}>
            Miles Equivalent
          </CustomText>
          <CustomText
            font={Fonts.extraBold}
            size={ms(22)}
            color={colors.primary}
          >
            {milesEquivalent.toLocaleString()}{' '}
            <CustomText font={Fonts.bold} size={ms(14)}>
              mi
            </CustomText>
          </CustomText>
        </View>

        <View style={styles.planRow}>
          <CustomText font={Fonts.medium} color={colors.textSecondary}>
            Cost Per Mile
          </CustomText>
          <CustomText
            font={Fonts.extraBold}
            size={ms(22)}
            color={colors.textPrimary}
          >
            ${costPerMile} / mi
          </CustomText>
        </View>

        <View style={styles.planRow}>
          <CustomText font={Fonts.medium} color={colors.textSecondary}>
            Monthly Rate
          </CustomText>
          <CustomText
            font={Fonts.extraBold}
            size={ms(22)}
            color={colors.textPrimary}
          >
            ${monthlyRate}
          </CustomText>
        </View>

        <View style={styles.planRow}>
          <CustomText font={Fonts.medium} color={colors.textSecondary}>
            Est. Tax (8.25%)
          </CustomText>
          <CustomText
            font={Fonts.extraBold}
            size={ms(22)}
            color={colors.textPrimary}
          >
            ${estTax}
          </CustomText>
        </View>

        <View style={styles.planDivider} />

        <View style={styles.sectionHeader}>
          <CustomText
            font={Fonts.bold}
            size={ms(10)}
            color={colors.textSecondary}
            style={{ letterSpacing: 1.5 }}
          >
            OPTIONAL ADD-ONS
          </CustomText>
        </View>

        <View style={styles.addOnRow}>
          <View style={{ flex: 1 }}>
            <CustomText
              font={Fonts.bold}
              size={ms(14)}
              color={colors.textPrimary}
            >
              Bidirectional Charging
            </CustomText>
            <View style={styles.badgeRow}>
              <View style={[styles.badge, { backgroundColor: colors.border }]}>
                <CustomText font={Fonts.bold} size={ms(9)} color={colors.primary}>
                  V2G
                </CustomText>
              </View>
            </View>
            <CustomText
              size={ms(10)}
              color={colors.textSecondary}
              style={{ marginTop: vs(4) }}
            >
              Send stored energy back to the grid or your home during peak
              hours. Earn bill credits automatically.
            </CustomText>
          </View>
          <Switch
            value={bidirectional}
            onValueChange={setBidirectional}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={bidirectional ? colors.white : colors.textMuted}
          />
        </View>

        <View style={styles.addOnRow}>
          <View style={{ flex: 1 }}>
            <CustomText
              font={Fonts.bold}
              size={ms(14)}
              color={colors.textPrimary}
            >
              Community Charging Loaner
            </CustomText>
            <View style={styles.badgeRow}>
              <View style={[styles.badge, { backgroundColor: colors.border }]}>
                <CustomText font={Fonts.bold} size={ms(9)} color={colors.info}>
                  +VP
                </CustomText>
              </View>
            </View>
            <CustomText
              size={ms(10)}
              color={colors.textSecondary}
              style={{ marginTop: vs(4) }}
            >
              Allow neighbors to borrow your charger when idle. Earn Volt Points
              and optional billing credits for every session shared.
            </CustomText>
          </View>
          <Switch
            value={communityCharging}
            onValueChange={setCommunityCharging}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={communityCharging ? colors.white : colors.textMuted}
          />
        </View>

        <View style={styles.planDivider} />

        <View style={styles.totalRow}>
          <CustomText
            font={Fonts.extraBold}
            size={ms(18)}
            color={colors.textPrimary}
          >
            Monthly Total
          </CustomText>
          <CustomText
            font={Fonts.extraBold}
            size={ms(28)}
            color={colors.primary}
          >
            ${monthlyTotal}
          </CustomText>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          <CustomText
            font={Fonts.bold}
            size={ms(12)}
            color={colors.textSecondary}
          >
            ADJUST KWH / MONTH
          </CustomText>
          <CustomText
            font={Fonts.bold}
            size={ms(12)}
            color={colors.textPrimary}
          >
            {kwh} kWh
          </CustomText>
        </View>
        <View
          style={styles.sliderTrack}
          onLayout={e => setSliderWidth(e.nativeEvent.layout.width)}
          {...panResponder.panHandlers}
        >
          <View
            style={[styles.sliderFill, { width: `${sliderProgress * 100}%` }]}
          />
          <View
            style={[styles.sliderThumb, { left: `${sliderProgress * 100}%` }]}
          />
        </View>
        <View style={styles.sliderLabels}>
          <CustomText size={10} color={colors.textMuted}>
            25 kWh
          </CustomText>
          <CustomText size={10} color={colors.textMuted}>
            250
          </CustomText>
          <CustomText size={10} color={colors.textMuted}>
            500
          </CustomText>
          <CustomText size={10} color={colors.textMuted}>
            750
          </CustomText>
          <CustomText size={10} color={colors.warning}>
            1,000 kWh
          </CustomText>
        </View>
      </View>

      <View style={styles.tipCard}>
        <CustomText size={ms(12)} color={colors.textPrimary}>
          💡 <CustomText font={Fonts.bold}>Tip:</CustomText> The average EV gets
          3.5 miles per kWh. You can adjust or upgrade your plan anytime from
          your dashboard.
        </CustomText>
      </View>

      <CustomButton
        title="Continue to Payment →"
        backgroundColor={colors.primary}
        titleColor={colors.textOnPrimary}
        size="lg"
        fullWidth
        onPress={onNext}
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
    planCard: {
      backgroundColor: colors.card,
      borderRadius: ms(24),
      padding: s(24),
      borderWidth: 1.5,
      borderColor: colors.primary + '33',
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
      marginTop: vs(8),
    },
    sectionHeader: {
      marginVertical: vs(16),
    },
    addOnRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: vs(16),
    },
    badgeRow: {
      flexDirection: 'row',
      marginTop: vs(4),
    },
    badge: {
      paddingHorizontal: s(6),
      paddingVertical: vs(1),
      borderRadius: ms(4),
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
    tipCard: {
      backgroundColor: colors.cardDark || colors.card,
      borderRadius: ms(20),
      padding: s(16),
      borderWidth: 1,
      borderColor: colors.border,
      marginTop: vs(16),
    },
    ctaBtn: {
      marginTop: vs(24),
      height: vs(42),
      borderRadius: ms(12),
    },
    backBtn: {
      marginTop: vs(12),
      height: vs(42),
      borderRadius: ms(12),
    },
  });

export default StepEnergyPlan;
