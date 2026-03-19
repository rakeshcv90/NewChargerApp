import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreens from '../Screen/SplashScreens';
import HomeScreen from '../Screen/HomeScreen';
import SignUpScreen from '../Screen/SignUpScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreens} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
