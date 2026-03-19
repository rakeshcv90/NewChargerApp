import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
  Alert,
  BackHandler,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import SpInAppUpdates, {
  IAUUpdateKind,
  IAUInstallStatus,
} from 'sp-react-native-in-app-updates';
import BottomTab from '../Component/BottomTab';
import Home from './Tab/Home';
import Stations from './Tab/Stations';
import Billing from './Tab/Billing';
import Profile from './Tab/Profile';
import { vs } from '../Utility/Scaling';
import { useTheme } from '../Utility/ThemeContext';
import ExitDialog from '../Component/ExitDialog';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { theme, colors, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Home');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const inAppUpdates = React.useRef(null);

  const dynamicStyles = useMemo(() => createStyles(colors), [colors]);

  const handleBackPress = useCallback(() => {
    console.log('handleBackPress | Active Tab:', activeTab);
    if (activeTab !== 'Home') {
      console.log('handleBackPress | Switching to Home tab');
      setActiveTab('Home');
      return true;
    } else {
      console.log('handleBackPress | Showing Exit Dialog');
      setShowExitDialog(true);
      return true;
    }
  }, [activeTab]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, [handleBackPress]);

  useEffect(() => {
    inAppUpdates.current = new SpInAppUpdates(false);
    checkForUpdate();

    return () => {
      if (inAppUpdates.current) {
        inAppUpdates.current.removeStatusUpdateListener(onStatusUpdate);
      }
    };
  }, []);

  const onStatusUpdate = event => {
    const { status, bytesDownloaded, totalBytesToDownload } = event;

    if (status === IAUInstallStatus.DOWNLOADING && totalBytesToDownload > 0) {
      const progress = Math.round(
        (bytesDownloaded / totalBytesToDownload) * 100,
      );
      setDownloadProgress(progress);
      console.log(`Downloading: ${progress}%`);
    }

    if (status === IAUInstallStatus.DOWNLOADED) {
      setDownloadProgress(100);
      Alert.alert(
        'Update Ready',
        'The update has been downloaded. Restart the app to apply it?',
        [
          {
            text: 'Restart Now',
            onPress: () => inAppUpdates.current?.installUpdate(),
          },
        ],
        { cancelable: false },
      );
    }
  };

  const checkForUpdate = async () => {
    try {
      const result = await inAppUpdates.current.checkNeedsUpdate({
        toSemverConverter: ver => {
          if (!isNaN(ver) && ver.length > 3) {
            const num = parseInt(ver, 10);
            const major = Math.trunc(num / 10000);
            const minor = Math.trunc((num - major * 10000) / 100);
            const patch = num % 100;
            return `${major}.${minor}.${patch}`;
          }
          return ver;
        },
      });

      if (result.shouldUpdate) {
        const updateOptions = Platform.select({
          ios: {
            title: 'Update Available',
            message:
              'A new version of the app is available. Please update for the best experience.',
            buttonUpgradeText: 'Update Now',
            buttonCancelText: 'Later',
          },
          android: {
            updateType:
              result.other?.updatePriority >= 4
                ? IAUUpdateKind.IMMEDIATE
                : IAUUpdateKind.FLEXIBLE,
          },
        });

        if (updateOptions.android?.updateType === IAUUpdateKind.FLEXIBLE) {
          inAppUpdates.current.addStatusUpdateListener(onStatusUpdate);
        }

        await inAppUpdates.current.startUpdate(updateOptions);
      }
    } catch (error) {
      console.log('In-app update check error:', error);
    }
  };

  const handleTabPress = tab => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ExitDialog
        visible={showExitDialog}
        onClose={() => setShowExitDialog(false)}
        onConfirm={() => BackHandler.exitApp()}
      />
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />

      {activeTab == 'Home' && <Home />}
      {activeTab == 'Stations' && <Stations />}
      {activeTab == 'Billing' && <Billing />}
      {activeTab == 'Profile' && <Profile />}

      <BottomTab activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

const createStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });

export default HomeScreen;
