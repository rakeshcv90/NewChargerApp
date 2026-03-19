import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import CustomText from '../../../Component/CustomText';
import Fonts from '../../../Utility/Fonts';
import { s, vs } from '../../../Utility/Scaling';
import createStyles from './HomeStyles';
import { useTheme } from '../../../Utility/ThemeContext';

const Leaderboard = () => {
  const { colors, theme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const leaderboardData = [
    {
      rank: 1,
      name: 'M. Chen',
      unit: '105',
      kWh: '312',
      vp: '+4,100 VP',
      rankColor: colors.warning,
      nameColor: colors.textPrimary,
      vpColor: colors.warning,
    },
    {
      rank: 2,
      name: 'E. Davis',
      unit: '302',
      kWh: '289',
      vp: '+3,600 VP',
      rankColor: theme === 'dark' ? '#E0E0E0' : '#666666',
      nameColor: colors.textPrimary,
      vpColor: colors.warning,
    },
    {
      rank: 4,
      name: 'You',
      unit: '402',
      kWh: '247',
      vp: '+2,340 VP',
      rankColor: colors.success,
      nameColor: colors.success,
      vpColor: colors.success,
      isUser: true,
    },
  ];

  return (
    <View style={styles.leaderboardSection}>
      <View style={styles.leaderboardHeaderContainer}>
        <View style={styles.leaderboardTitleContainer}>
          <CustomText
            size={18}
            style={{ marginRight: s(10), marginTop: vs(2) }}
          >
            🏆
          </CustomText>
          <View>
            <CustomText size={18} font={Fonts.extraBold} color={colors.textPrimary}>
              Building
            </CustomText>
            <CustomText
              size={16}
              font={Fonts.extraBold}
              color={colors.textPrimary}
              style={{ marginTop: vs(-4) }}
            >
              Leaderboard
            </CustomText>
          </View>
        </View>

        <View style={styles.leaderboardTabs}>
          <TouchableOpacity
            style={[styles.leaderboardTab, styles.leaderboardTabActive]}
          >
            <CustomText size={11} font={Fonts.bold} color={colors.success}>
              kWh
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.leaderboardTab}>
            <CustomText
              size={11}
              font={Fonts.bold}
              color={colors.textSecondary}
            >
              VP
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>

      {leaderboardData.map((item, index) => (
        <View key={index} style={styles.leaderboardRow}>
          {/* Rank */}
          <CustomText
            size={15}
            font={Fonts.bold}
            color={item.rankColor}
            style={{ width: s(25), textAlign: 'left' }}
          >
            {item.rank}
          </CustomText>

          {/* Name & ID */}
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <CustomText
              size={12}
              font={Fonts.bold}
              color={item.nameColor}
              numberOfLines={1}
              style={{ flexShrink: 1 }}
            >
              {item.name}
            </CustomText>
            <CustomText size={14} font={Fonts.extraBold} color={item.nameColor}>
              {' · '}
            </CustomText>
            <CustomText
              size={12}
              font={item.isUser ? Fonts.medium : Fonts.extraBold}
              color={item.nameColor}
              numberOfLines={1}
            >
              {item.unit}
            </CustomText>
          </View>

          {/* Stats Container (Fixed width, never shrinks) */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: s(10),
              flexShrink: 0,
            }}
          >
            {/* kWh */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                width: s(60),
                justifyContent: 'flex-end',
              }}
            >
              <CustomText
                size={12}
                font={Fonts.medium}
                color={colors.textSecondary}
              >
                {item.kWh}
              </CustomText>
              <CustomText
                size={11}
                font={Fonts.bold}
                color={colors.textMuted}
                style={{ marginLeft: s(2) }}
              >
                kWh
              </CustomText>
            </View>

            {/* VP */}
            <View style={{ width: s(85), alignItems: 'flex-end' }}>
              <CustomText size={12} font={Fonts.bold} color={item.vpColor}>
                {item.vp}
              </CustomText>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Leaderboard;
