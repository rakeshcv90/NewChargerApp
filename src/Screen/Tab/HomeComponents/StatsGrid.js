import React, { useMemo } from 'react';
import { View } from 'react-native';
import CustomText from '../../../Component/CustomText';
import Fonts from '../../../Utility/Fonts';
import { s, vs } from '../../../Utility/Scaling';
import createStyles from './HomeStyles';
import { useTheme } from '../../../Utility/ThemeContext';

const StatsGrid = ({ stats }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.statsGrid}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statCard}>
          <CustomText size={13} color={colors.textSecondary} font={Fonts.semiBold}>
            {stat.label}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              marginVertical: vs(5),
            }}
          >
            <CustomText size={22} font={Fonts.extraBold} color={stat.color || colors.textPrimary}>
              {stat.value}
            </CustomText>
            {stat.unit ? (
              <CustomText
                size={12}
                color={colors.textSecondary}
                style={{ marginLeft: s(4) }}
              >
                {stat.unit}
              </CustomText>
            ) : null}
          </View>
          <CustomText
            size={12}
            color={
              stat.change.includes('↑') ||
              stat.change.includes('$') ||
              stat.change.includes('equivalent')
                ? colors.success
                : colors.textSecondary
            }
          >
            {stat.change}
          </CustomText>
        </View>
      ))}
    </View>
  );
};

export default StatsGrid;
