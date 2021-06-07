import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import AppLoading from 'expo-app-loading';
import RegisterSuccessScreen from './src/screens/RegisterSuccessScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ResetSuccessScreen from './src/screens/ResetSuccessScreen';

import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Roboto_900Black, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { color } from 'react-native-reanimated';



const Stack = createStackNavigator();

const screens = [
  { name: 'Login', component: LoginScreen },
  { name: 'Register', component: RegisterScreen },
  { name: 'Home', component: HomeScreen },
  { name: 'RegisterSuccess', component: RegisterSuccessScreen },
  { name: 'ForgotPassword', component: ForgotPasswordScreen },
  { name: 'ResetSuccess', component: ResetSuccessScreen },
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
      <Stack.Navigator initialRouteName={screens[0].name} headerMode="none" screenOptions={{ animationEnabled: false }} mode="modal" >
        {screens.map(({ name, component }) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
