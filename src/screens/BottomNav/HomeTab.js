import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../HomeScreens/HomeScreen';
import RoomScreen from '../HomeScreens/RoomScreen';
import InvitationScreen from '../HomeScreens/InvitationScreen';

const homeStack = createStackNavigator();

const screens = [
    { name: 'Home', component: HomeScreen },
    { name: 'Room', component: RoomScreen },
    { name: 'Invitation', component: InvitationScreen },
];

export default () => {
  return (
      <homeStack.Navigator initialRouteName={screens[0].name} headerMode="none" screenOptions={{ animationEnabled: false }} mode="modal">
        {screens.map(({ name, component }) => (
          <homeStack.Screen key={name} name={name} component={component} />
        ))}
      </homeStack.Navigator>
  );
}