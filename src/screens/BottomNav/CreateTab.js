import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import InviteSentScreen from "../CreateScreens/InviteSentScreen";
import CreateRoomScreen from '../CreateScreens/CreateRoomScreen';


const createStack = createStackNavigator();

const screens = [
    { name: 'Create', component: CreateRoomScreen },
    { name: 'InviteSent', component: InviteSentScreen },
];

export default () => {
  return (
      <createStack.Navigator initialRouteName={screens[0].name} headerMode="none" screenOptions={{ animationEnabled: false }} mode="modal">
        {screens.map(({ name, component }) => (
          <createStack.Screen key={name} name={name} component={component} />
        ))}
      </createStack.Navigator>
  );
}