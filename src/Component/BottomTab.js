import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import Fonts from '../Utility/Fonts';
import { vs, ms } from '../Utility/Scaling';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../Utility/ThemeContext';

const BottomTab = ({ activeTab, onTabPress }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();
  
  const tabs = [
    { key: 'Home', icon: '⚡', label: 'Home' },
    { key: 'Stations', icon: '📍', label: 'Stations' },
    { key: 'Billing', icon: '💳', label: 'Billing' },
    { key: 'Profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => onTabPress(tab.key)}
            >
              <View style={styles.iconContainer}>
                <CustomText
                  size={ms(20)}
                  color={isActive ? colors.primary : colors.textMuted}
                  style={isActive ? styles.activeIcon : {}}
                >
                  {tab.icon}
                </CustomText>
              </View>
              <CustomText
                size={ms(12)}
                font={isActive ? Fonts.bold : Fonts.medium}
                color={isActive ? colors.primary : colors.textMuted}
                style={styles.label}
              >
                {tab.label}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const createStyles = (colors) => StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: vs(60),
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    marginBottom: vs(4),
  },
  label: {
    marginTop: vs(2),
  },
  activeIcon: {
    textShadowColor: colors.primary + '4D', // 0.3 opacity hex suffix is 4D
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default BottomTab;
