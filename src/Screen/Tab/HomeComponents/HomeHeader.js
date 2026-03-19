import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import CustomText from '../../../Component/CustomText';
import Fonts from '../../../Utility/Fonts';
import createStyles from './HomeStyles';
import { useTheme } from '../../../Utility/ThemeContext';

const HomeHeader = ({ onNotificationPress, isCharging }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        <CustomText size={14} color={colors.textSecondary} font={Fonts.medium}>
          {isCharging ? 'Charging now' : 'Good evening'}
        </CustomText>
        <CustomText size={22} color={colors.textPrimary} font={Fonts.extraBold} style={{ marginTop: 2 }}>
          {isCharging ? 'Station A-2' : 'Sarah Johnson'}
        </CustomText>
      </View>
      <View style={styles.headerIcons}>
        <View style={styles.vpBadge}>
          <CustomText size={12} color={colors.warning} font={Fonts.bold}>
            ⚡ {isCharging ? '2,415' : '2,340'} VP
          </CustomText>
        </View>
        <View style={styles.streakBadge}>
          <CustomText size={12} color={colors.warning} font={Fonts.bold}>
            🔥 7
          </CustomText>
        </View>
        <TouchableOpacity 
          style={styles.notificationBell}
          onPress={onNotificationPress}
        >
          <CustomText size={16}>🔔</CustomText>
          <View style={styles.notificationDot}>
            <CustomText size={8} color={colors.textOnPrimary} font={Fonts.bold}>
              {isCharging ? '1' : '2'}
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
