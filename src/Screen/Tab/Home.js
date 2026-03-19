import React, { useState, useMemo } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useTheme } from '../../Utility/ThemeContext';
import CustomButton from '../../Component/CustomButton';
import Fonts from '../../Utility/Fonts';

// Modular Components
import createStyles from './HomeComponents/HomeStyles';
import HomeHeader from './HomeComponents/HomeHeader';
import VehicleCard from './HomeComponents/VehicleCard';
import MissionsSection from './HomeComponents/MissionsSection';
import StatsGrid from './HomeComponents/StatsGrid';
import Leaderboard from './HomeComponents/Leaderboard';
import AccountSection from './HomeComponents/AccountSection';
import SkinsModal from './HomeComponents/SkinsModal';
import LiveCard from './HomeComponents/LiveCard';

const Home = () => {
  const [isCharging, setIsCharging] = useState(false);
  const [showSkinsModal, setShowSkinsModal] = useState(false);
  const { colors, theme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  
  const [equippedSkin, setEquippedSkin] = useState({
    id: 'standard',
    name: 'Standard White',
    emoji: '🚗',
    color: '#FFFFFF',
  });
  const insets = useSafeAreaInsets();

  const skins = [
    {
      id: 'standard',
      name: 'Standard White',
      emoji: '🚗',
      status: 'Equipped',
      sub: '✓ Active',
      color: colors.textPrimary,
    },
    {
      id: 'matte',
      name: 'Matte Black',
      emoji: '🚙',
      status: '500 VP',
      color: theme === 'dark' ? '#1A1A1A' : '#444444',
    },
    ...[] // ... other skins
  ];

  const idleStats = [
    {
      label: 'This Month',
      value: '247',
      unit: 'kWh',
      change: '↑ 12% vs last',
      color: colors.textPrimary,
    },
    {
      label: 'Sessions',
      value: '18',
      unit: '',
      change: '4 this week',
      color: colors.info,
    },
    {
      label: 'CO₂ Saved',
      value: '156',
      unit: 'kg',
      change: 'this month',
      color: colors.warning,
    },
    {
      label: 'VP Earned',
      value: '2,340',
      unit: '',
      change: '↑ 340 this week',
      color: colors.warning,
    },
  ];

  const chargingStats = [
    {
      label: 'SESSION COST',
      value: '$2.49',
      unit: '',
      change: '$0.088 / kWh',
      color: colors.success,
    },
    {
      label: 'MILES ADDED',
      value: '96',
      unit: 'mi',
      change: 'equivalent',
      color: colors.textPrimary,
    },
    {
      label: 'MONTHLY USED',
      value: '247',
      unit: 'kWh',
      change: 'of 300 plan',
      color: colors.textPrimary,
    },
    {
      label: 'VP THIS SESSION',
      value: '+75',
      unit: '',
      change: 'off-peak bonus!',
      color: colors.warning,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

      <HomeHeader
        isCharging={isCharging}
        onNotificationPress={() => console.log('Notif pressed')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {!isCharging ? (
          <>
            <VehicleCard
              equippedSkin={equippedSkin}
              onSkinsPress={() => setShowSkinsModal(true)}
            />
            <MissionsSection isCharging={false} />

            <CustomButton
              title="⚡ Start Charging →"
              backgroundColor={colors.primary}
              titleColor={colors.textOnPrimary}
              size="lg"
              fullWidth
              onPress={() => setIsCharging(true)}
              style={styles.startButton}
              titleFont={Fonts.extraBold}
            />
            <StatsGrid stats={idleStats} />
            <Leaderboard />
            <AccountSection isCharging={false} />
          </>
        ) : (
          <View style={styles.chargingState}>
            <VehicleCard
              equippedSkin={equippedSkin}
              onSkinsPress={() => setShowSkinsModal(true)}
              isCharging={true}
            />
            <LiveCard onStopPress={() => setIsCharging(false)} />
            <MissionsSection isCharging={true} />
            <StatsGrid stats={chargingStats} />
            <AccountSection isCharging={true} />
          </View>
        )}
      </ScrollView>

      <SkinsModal
        visible={showSkinsModal}
        onClose={() => setShowSkinsModal(false)}
        skins={skins}
        equippedSkin={equippedSkin}
        setEquippedSkin={setEquippedSkin}
      />
    </SafeAreaView>
  );
};

export default Home;
