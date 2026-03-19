import React, { useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import CustomText from '../../../Component/CustomText';
import Fonts from '../../../Utility/Fonts';
import { vs } from '../../../Utility/Scaling';
import createStyles from './HomeStyles';
import { useTheme } from '../../../Utility/ThemeContext';

const MissionsSection = ({ isCharging }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (isCharging) {
    return (
      <View style={styles.missionsContainer}>
        <View style={styles.missionsHeader}>
          <CustomText size={12} color={colors.textSecondary} font={Fonts.extraBold}>
            ACTIVE MISSION PROGRESS
          </CustomText>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.missionsScroll}
          contentContainerStyle={styles.missionsScrollContent}
        >
          <View style={[styles.missionCard, styles.missionDone]}>
            <CustomText size={20} style={{ marginBottom: vs(10) }}>
              ⚡
            </CustomText>
            <CustomText size={14} color={colors.textPrimary} font={Fonts.bold}>
              Charge 10 kWh today
            </CustomText>
            <CustomText size={12} color={colors.warning} font={Fonts.extraBold}>
              +75 VP
            </CustomText>
            <View style={styles.missionProgressBase}>
              <View
                style={[
                  styles.missionProgressFill,
                  { width: '100%', backgroundColor: colors.success },
                ]}
              />
            </View>
            <CustomText size={11} color={colors.success} font={Fonts.bold}>
              ✓ Earned!
            </CustomText>
          </View>
          <View style={[styles.missionCard, { borderColor: colors.warning + '30' }]}>
            <CustomText size={20} style={{ marginBottom: vs(10) }}>
              🌙
            </CustomText>
            <CustomText size={14} color={colors.textPrimary} font={Fonts.bold}>
              Off-peak bonus active
            </CustomText>
            <CustomText size={12} color={colors.warning} font={Fonts.extraBold}>
              +25 VP
            </CustomText>
            <View style={styles.missionProgressBase}>
              <View
                style={[
                  styles.missionProgressFill,
                  { width: '40%', backgroundColor: colors.warning },
                ]}
              />
            </View>
            <CustomText size={11} color={colors.warning} font={Fonts.bold}>
              Counting now!
            </CustomText>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.missionsContainer}>
      <View style={styles.missionsHeader}>
        <CustomText size={16} color={colors.textPrimary} font={Fonts.bold}>
          Daily Missions
        </CustomText>
        <CustomText size={12} color={colors.success} font={Fonts.bold}>
          2 / 3 Complete
        </CustomText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.missionsScroll}
        contentContainerStyle={styles.missionsScrollContent}
      >
        <View style={[styles.missionCard, styles.missionDone]}>
          <CustomText size={20} style={{ marginBottom: vs(5) }}>
            ⚡
          </CustomText>
          <CustomText size={14} color={colors.textPrimary} font={Fonts.bold}>
            Charge 10 kWh
          </CustomText>
          <CustomText size={12} color={colors.textSecondary}>
            +75 VP
          </CustomText>
          <View style={styles.missionProgressBase}>
            <View style={[styles.missionProgressFill, { width: '100%' }]} />
          </View>
          <CustomText size={10} color={colors.success} font={Fonts.bold}>
            ✓ Complete
          </CustomText>
        </View>
        <View style={[styles.missionCard, styles.missionDone]}>
          <CustomText size={20} style={{ marginBottom: vs(5) }}>
            🌙
          </CustomText>
          <CustomText size={14} color={colors.textPrimary} font={Fonts.bold}>
            Off-peak session
          </CustomText>
          <CustomText size={12} color={colors.textSecondary}>
            +25 VP
          </CustomText>
          <View style={styles.missionProgressBase}>
            <View style={[styles.missionProgressFill, { width: '100%' }]} />
          </View>
          <CustomText size={10} color={colors.success} font={Fonts.bold}>
            ✓ Complete
          </CustomText>
        </View>
        <View style={styles.missionCard}>
          <CustomText size={20} style={{ marginBottom: vs(5) }}>
            🏆
          </CustomText>
          <CustomText size={14} color={colors.textPrimary} font={Fonts.bold}>
            Reach Silver I
          </CustomText>
          <CustomText size={12} color={colors.textSecondary}>
            +150 VP
          </CustomText>
          <View style={styles.missionProgressBase}>
            <View style={[styles.missionProgressFill, { width: '30%' }]} />
          </View>
          <CustomText size={10} color={colors.textSecondary} font={Fonts.medium}>
            30% progress
          </CustomText>
        </View>
      </ScrollView>
    </View>
  );
};

export default MissionsSection;
