import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Text, TouchableOpacity } from 'react-native';
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={32}/>
        </TouchableOpacity>
        <Text style={styles.title}>Friends</Text>
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
    height: "12%",
    marginTop: 20,
    marginBottom: 5,
    flexDirection: "row"
  },
  backButton: {
    alignSelf: "center",
    justifyContent: "center",
    paddingTop: "1%",
    paddingLeft: "1%",
    height: "70%",
    width: "10%",
  },
  title: {
    color: '#F8F5F1',
    fontSize: 45,
    fontFamily: 'Montserrat_700Bold',
    paddingTop: "5%",
  },
  nav: {
    flex: 1,
    textAlign: 'center',
  },
});
