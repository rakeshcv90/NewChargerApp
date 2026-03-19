import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../Component/CustomText';
import Fonts from '../../../Utility/Fonts';
import createStyles from './HomeStyles';
import { useTheme } from '../../../Utility/ThemeContext';

const VehicleCard = ({ equippedSkin, onSkinsPress, isCharging }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const CardContainer = isCharging ? LinearGradient : View;
  const gradientProps = isCharging ? {
    colors: [colors.cardGreen, colors.cardDark],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
    style: styles.vehicleCard
  } : {
    style: styles.vehicleCard
  };

  return (
    <CardContainer {...gradientProps}>
      <TouchableOpacity style={styles.skinsLabel} onPress={onSkinsPress}>
        <CustomText size={10} font={Fonts.bold} color={colors.textSecondary}>
          🎨 Skins
        </CustomText>
      </TouchableOpacity>

      <CustomText style={styles.carEmoji} size={120}>
        {equippedSkin.emoji}
      </CustomText>

      {isCharging && (
        <CustomText 
          size={12} 
          color={colors.textSecondary} 
          font={Fonts.medium} 
          style={{ marginBottom: 15, textAlign: 'center' }}
        >
          No vehicle added — complete ④ Details
        </CustomText>
      )}

      <View style={styles.rankContainer}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomText size={14} color={colors.success} font={Fonts.extraBold}>
              ⚡ VOLTAGE — 
            </CustomText>
            <CustomText size={14} color={colors.success} font={Fonts.extraBold}>
              Rank 3
            </CustomText>
          </View>
        </View>
        {isCharging && (
          <View style={{ alignItems: 'flex-end' }}>
             <CustomText size={11} color={colors.textSecondary} font={Fonts.medium}>
              +75 VP this
            </CustomText>
            <CustomText size={11} color={colors.textSecondary} font={Fonts.medium}>
              session
            </CustomText>
          </View>
        )}
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.statusBar, { width: '45%', backgroundColor: colors.success }]} />
      </View>
      
      {!isCharging ? (
        <CustomText size={10} color={colors.textMuted} style={{ alignSelf: 'flex-end' }}>
          2,340 / 3,500 VP
        </CustomText>
      ) : (
        <CustomText size={10} color={colors.textMuted} style={{ alignSelf: 'flex-end' }}>
          2,415 / 3,500 VP
        </CustomText>
      )}
    </CardContainer>
  );
};

export default VehicleCard;
