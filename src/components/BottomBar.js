import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileTab from '../screens/BottomNav/ProfileTab';
import HomeTab from '../screens/BottomNav/HomeTab';
import CreateTab from '../screens/BottomNav/CreateTab';

const bottomTab = createMaterialBottomTabNavigator();

export default () => {
  return (
    <bottomTab.Navigator initialRouteName="Home" barStyle={{ backgroundColor: 'white' }} tabBarOptions={{ keyboardHidesTabBar: true }}>
      <bottomTab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
        }}
      />
      <bottomTab.Screen
        name="Create"
        component={CreateTab}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus-circle" color={color} size={26} />,
        }}
      />
      <bottomTab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle" color={color} size={26} />,
        }}
      />
    </bottomTab.Navigator>
  );
};
