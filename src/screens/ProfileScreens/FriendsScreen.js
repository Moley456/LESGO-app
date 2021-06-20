import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddFriendScreen from './AddFriendScreen';
import CurrentFriendScreen from './CurrentFriendScreen';
import PendingFriendScreen from './PendingFriendScreen';
import { Ionicons } from '@expo/vector-icons';

const friendsTab = createMaterialTopTabNavigator();
export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="chevron-back" size={32} style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('UserProfile')} />
        <Text style={styles.title}> Friends </Text>
      </View>

      <friendsTab.Navigator initialRouteName="All" style={styles.nav}>
        <friendsTab.Screen name="All" component={CurrentFriendScreen} options={{ tabBarLabel: 'Current' }} />
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
  searchContainer: {
    height: 50,
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    color: '#F8F5F1',
    fontSize: 30,
    fontFamily: 'Montserrat_700Bold',
    paddingTop: 10,
    paddingLeft: 10,
  },
  search: {
    flex: 1,
    height: 50,
    width: '90%',
  },
  nav: {
    flex: 1,
    textAlign: 'center',
  },
});
