import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddFriendScreen from '../screens/ProfileScreens/AddFriendScreen';
import AllFriendScreen from '../screens/ProfileScreens/AllFriendScreen';
import PendingFriendScreen from '../screens/ProfileScreens/PendingFriendScreen';

const friendsTab = createMaterialTopTabNavigator();
export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <friendsTab.Navigator initialRouteName="All">
        <friendsTab.Screen name="All" component={AllFriendScreen} options={{ tabBarLabel: 'All' }} />
        <friendsTab.Screen name="Add" component={AddFriendScreen} options={{ tabBarLabel: 'Add' }} />
        <friendsTab.Screen name="Pending" component={PendingFriendScreen} options={{ tabBarLabel: 'Pending' }} />
      </friendsTab.Navigator>
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