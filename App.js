import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import AppLoading from 'expo-app-loading';
import RegisterSuccessScreen from './src/screens/RegisterSuccessScreen';

import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Roboto_900Black } from '@expo-google-fonts/roboto';

const Stack = createStackNavigator();

const screens = [
  { name: 'Login', component: LoginScreen },
  { name: 'Register', component: RegisterScreen },
  { name: 'Home', component: HomeScreen },
  { name: 'RegisterSuccess', component: RegisterSuccessScreen },
];

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screens[0].name} headerMode="none" screenOptions={{ animationEnabled: false }}>
        {screens.map(({ name, component }) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
