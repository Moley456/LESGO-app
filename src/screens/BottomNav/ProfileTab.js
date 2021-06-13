import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FriendsNav from "../../components/FriendsBar";
import UserProfileScreen from '../ProfileScreens/UserProfileScreen';

const profileStack = createStackNavigator();

const screens = [
    { name: 'UserProfile', component: UserProfileScreen },
    { name: 'FriendsNav', component: FriendsNav },
];

export default () => {
  return (
      <profileStack.Navigator initialRouteName={screens[0].name} headerMode="none" screenOptions={{ animationEnabled: false }} mode="modal">
        {screens.map(({ name, component }) => (
          <profileStack.Screen key={name} name={name} component={component} />
        ))}
      </profileStack.Navigator>
  );
}