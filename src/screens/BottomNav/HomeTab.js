import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../HomeScreens/HomeScreen';

const homeStack = createStackNavigator();

const screens = [
    { name: 'Home', component: HomeScreen },
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