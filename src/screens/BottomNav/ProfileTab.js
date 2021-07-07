import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FriendsScreen from '../ProfileScreens/FriendsScreen';
import UserProfileScreen from '../ProfileScreens/UserProfileScreen';
import BioScreen from '../ProfileScreens/BioScreen';
import PictureScreen from '../ProfileScreens/PictureScreen';
import UsernameScreen from '../ProfileScreens/UsernameScreen';
import PasswordScreen from '../ProfileScreens/PasswordScreen';

const profileStack = createStackNavigator();

const screens = [
  { name: 'UserProfile', component: UserProfileScreen },
  { name: 'FriendsScreen', component: FriendsScreen },
  { name: 'BioScreen', component: BioScreen },
  { name: 'PictureScreen', component: PictureScreen },
  { name: 'UsernameScreen', component: UsernameScreen },
  { name: 'PasswordScreen', component: PasswordScreen },

];

export default () => {
  return (
    <profileStack.Navigator initialRouteName={screens[0].name} headerMode="none" screenOptions={{ animationEnabled: false }} mode="modal">
      {screens.map(({ name, component }) => (
        <profileStack.Screen key={name} name={name} component={component} />
      ))}
    </profileStack.Navigator>
  );
};
