import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useColorScheme } from 'react-native';
import Colors from './Colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system'); // 'light' | 'dark' | 'system'

  const theme = useMemo(() => {
    if (themeMode === 'system') {
      return deviceTheme || 'dark';
    }
    return themeMode;
  }, [themeMode, deviceTheme]);

  const toggleTheme = () => {
    setThemeMode(prevMode => {
      if (prevMode === 'system') {
        return deviceTheme === 'dark' ? 'light' : 'dark';
      }
      return prevMode === 'light' ? 'dark' : 'light';
    });
  };

  const colors = Colors[theme] || Colors.dark;

  return (
    <ThemeContext.Provider
      value={{ theme, themeMode, setThemeMode, colors, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
