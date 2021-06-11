import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/AuthScreens/LoginScreen';
import RegisterScreen from './src/screens/AuthScreens/RegisterScreen';
import HomeScreen from './src/screens/BottomNavScreens/HomeScreen';
import AppLoading from 'expo-app-loading';
import RegisterSuccessScreen from './src/screens/AuthScreens/RegisterSuccessScreen';
import ForgotPasswordScreen from './src/screens/AuthScreens/ForgotPasswordScreen';
import ResetSuccessScreen from './src/screens/AuthScreens/ResetSuccessScreen';
import UserProfileScreen from './src/screens/BottomNavScreens/UserProfileScreen';
import CreateRoomScreen from './src/screens/BottomNavScreens/CreateRoomScreen';

import BottomBar from './src/components/BottomBar';

import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Roboto_900Black, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { View } from 'react-native';
import FriendNav from './src/screens/FriendNavScreens/FriendNav';

const Stack = createStackNavigator();

const screens = [
  { name: 'Login', component: LoginScreen },
  { name: 'Register', component: RegisterScreen },
  { name: 'Home', component: HomeScreen },
  { name: 'RegisterSuccess', component: RegisterSuccessScreen },
  { name: 'ForgotPassword', component: ForgotPasswordScreen },
  { name: 'ResetSuccess', component: ResetSuccessScreen },
  { name: 'UserProfile', component: UserProfileScreen },
  { name: 'Main', component: BottomBar },
  { name: 'Friends', component: FriendNav },
  { name: 'CreateRoom', component: CreateRoomScreen },
];

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Roboto_900Black,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screens[0].name} headerMode="none" screenOptions={{ animationEnabled: false }} mode="modal">
        {screens.map(({ name, component }) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
