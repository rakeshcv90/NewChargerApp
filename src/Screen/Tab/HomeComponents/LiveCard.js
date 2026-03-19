import React, { useMemo } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../Component/CustomText';
import CustomButton from '../../../Component/CustomButton';
import Fonts from '../../../Utility/Fonts';
import { s } from '../../../Utility/Scaling';
import createStyles from './HomeStyles';
import { useTheme } from '../../../Utility/ThemeContext';

const LiveCard = ({ onStopPress }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <LinearGradient
      colors={[colors.cardGreen, colors.cardDark]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.liveCard}
    >
      <View style={styles.liveHeader}>
        <View>
          <CustomText size={12} color={colors.textSecondary} font={Fonts.bold}>
            DELIVERING POWER
          </CustomText>
          <CustomText
            size={18}
            font={Fonts.extraBold}
            color={colors.textPrimary}
            style={{ letterSpacing: -0.5 }}
          >
            Level 2 · 7.2 kW
          </CustomText>
        </View>
        <View style={styles.liveBadge}>
          <CustomText size={11} color={colors.success} font={Fonts.bold}>
            ● Live
          </CustomText>
        </View>
      </View>

      <View style={styles.mainProgressContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <CustomText
            size={50}
            font={Fonts.regular}
            color={colors.primary}
            style={{ lineHeight: 70 }}
          >
            28.4
          </CustomText>
          <CustomText
            size={20}
            color={colors.textSecondary}
            style={{ marginLeft: s(20) }}
            font={Fonts.bold}
          >
            kWh
          </CustomText>
        </View>
        <CustomText
          size={14}
          color={colors.textSecondary}
          style={{ marginTop: -5 }}
        >
          delivered this session
        </CustomText>
      </View>

      <View style={styles.statusBarContainer}>
        <View style={[styles.statusBar, { width: '72%', backgroundColor: colors.primary }]} />
      </View>
      <View style={styles.statusScaleRow}>
        <CustomText size={15} color={colors.textSecondary}>
          0%
        </CustomText>
        <CustomText size={15} color={colors.primary} font={Fonts.semiBold}>
          72% charged
        </CustomText>
        <CustomText size={15} color={colors.textMuted}>
          100%
        </CustomText>
      </View>

      <View style={styles.sessionBriefRow}>
        <View style={styles.briefCol}>
          <CustomText size={10} color={colors.textSecondary} font={Fonts.bold}>
            DURATION
          </CustomText>
          <CustomText size={16} color={colors.textPrimary} font={Fonts.bold}>
            1:23
          </CustomText>
        </View>
        <View style={styles.briefCol}>
          <CustomText size={10} color={colors.textSecondary} font={Fonts.bold}>
            RATE
          </CustomText>
          <CustomText size={16} color={colors.textPrimary} font={Fonts.bold}>
            7.2kW
          </CustomText>
        </View>
        <View style={styles.briefCol}>
          <CustomText size={10} color={colors.textSecondary} font={Fonts.bold}>
            EST. DONE
          </CustomText>
          <CustomText size={16} color={colors.textPrimary} font={Fonts.bold}>
            8:45p
          </CustomText>
        </View>
      </View>

      <CustomButton
        title="Stop Charging Session"
        backgroundColor={colors.error + '20'}
        borderColor={colors.error}
        borderWidth={1}
        titleColor={colors.error}
        size="lg"
        fullWidth
        onPress={onStopPress}
        style={styles.stopButton}
        titleFont={Fonts.bold}
        titleSize={16}
        shadowOpacity={0}
      />
    </LinearGradient>
  );
};

export default LiveCard;
