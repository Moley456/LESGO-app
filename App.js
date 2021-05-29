import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createStackNavigator();

const screens = [
  { name: "Login", component: LoginScreen },
  { name: "Register", component: RegisterScreen },
];

export default function App() {
  return (
    <NavigationContainer>
          <Stack.Navigator initialRouteName={screens[0].name} headerMode="none" screenOptions={{ animationEnabled: false }}>
            {screens.map(({ name, component }) => (
              <Stack.Screen key={name} name={name} component={component} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
  )
}

