import React, { useMemo } from 'react';
import { View } from 'react-native';
import CustomText from '../../../Component/CustomText';
import Fonts from '../../../Utility/Fonts';
import createStyles from './HomeStyles';
import { useTheme } from '../../../Utility/ThemeContext';

const AccountSection = ({ isCharging }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (isCharging) {
    return (
      <View style={styles.accountSection}>
        <View style={styles.accountHeader}>
          <CustomText size={12} color={colors.textSecondary} font={Fonts.extraBold}>
            CHARGING SESSION
          </CustomText>
          <View style={styles.liveBadge}>
            <CustomText size={11} color={colors.success} font={Fonts.bold}>
              ● Active
            </CustomText>
          </View>
        </View>
        {[
          { label: 'Station', value: 'A-2 · Level 2' },
          { label: 'Rate', value: '7.2 kW', color: colors.success },
          { label: 'Vehicle', value: 'None added yet', isGhost: true },
        ].map((item, index) => (
          <View
            key={index}
            style={[
              styles.accountItem,
              index === 2 && { borderBottomWidth: 0 },
            ]}
          >
            <CustomText size={14} color={colors.textSecondary}>
              {item.label}
            </CustomText>
            <CustomText
              size={14}
              font={Fonts.bold}
              color={item.color || (item.isGhost ? colors.textMuted : colors.textPrimary)}
            >
              {item.value}
            </CustomText>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.accountCard}>
      <View style={styles.accountHeader}>
        <CustomText size={16} color={colors.textPrimary} font={Fonts.bold}>
          Account
        </CustomText>
        <View style={styles.planPill}>
          <CustomText size={11} color={colors.info} font={Fonts.bold}>
            Pro · 300 kWh
          </CustomText>
        </View>
      </View>
      {[
        { key: 'Name', val: 'Sarah Johnson' },
        { key: 'Unit', val: 'Apt 4B · Building A' },
        { key: 'Installation', val: 'Fort Liberty, NC' },
        { key: 'Next Bill', val: 'Mar 1 · $85.52' },
        { key: 'Vehicle', val: 'None added yet', isGhost: true },
      ].map((item, index) => (
        <View key={index} style={styles.accountRow}>
          <CustomText size={13} color={colors.textSecondary}>
            {item.key}
          </CustomText>
          <CustomText
            size={13}
            color={item.isGhost ? colors.textMuted : colors.textPrimary}
            font={Fonts.medium}
          >
            {item.val}
          </CustomText>
        </View>
      ))}
    </View>
  );
};

export default AccountSection;
