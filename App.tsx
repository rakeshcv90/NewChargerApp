import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/Navigation/AppNavigator';
import { ThemeProvider, useTheme } from './src/Utility/ThemeContext';

const AppContent = () => {
  const { colors, theme } = useTheme();

  const navigationTheme = {
    dark: theme === 'dark',
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.textPrimary,
      border: colors.border,
      notification: colors.primary,
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' },
      medium: { fontFamily: 'System', fontWeight: '500' },
      bold: { fontFamily: 'System', fontWeight: '700' },
      heavy: { fontFamily: 'System', fontWeight: '800' },
    },
  } as const;

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar
        backgroundColor={colors.background}
        translucent={false}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <AppNavigator />
    </NavigationContainer>
  );
};

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
