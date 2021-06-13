import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddFriendScreen from './AddFriendScreen';
import AllFriendScreen from './AllFriendScreen';
import PendingFriendScreen from './PendingFriendScreen';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator initialRouteName="All">
        <Tab.Screen name="All" component={AllFriendScreen} options={{ tabBarLabel: 'All' }} />
        <Tab.Screen name="Add" component={AddFriendScreen} options={{ tabBarLabel: 'Add' }} />
        <Tab.Screen name="Pending" component={PendingFriendScreen} options={{ tabBarLabel: 'Pending' }} />
      </Tab.Navigator>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5AA397',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
  },
});
