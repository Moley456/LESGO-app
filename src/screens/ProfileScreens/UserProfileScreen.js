import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import * as Authentication from '../../../api/auth';

export default ({ navigation }) => {
  const handleLogout = () => {
    Authentication.signOut(
      () =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        ),
      console.error
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.headerText}>{Authentication.getCurrentUserName()}</Text>

      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('FriendsScreen')}>
        <Text style={styles.tabBoldText}>Friends</Text>
        <Text style={styles.tabText}>edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('BioScreen')}>
        <Text style={styles.tabBoldText}>Bio</Text>
        <Text style={styles.tabText}>edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('PictureScreen')}>
        <Text style={styles.tabBoldText}>Picture</Text>
        <Text style={styles.tabText}>edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('UsernameScreen')}>
        <Text style={styles.tabBoldText}>Username</Text>
        <Text style={styles.tabText}>edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('PasswordScreen')}>
        <Text style={styles.tabBoldText}>Password</Text>
        <Text style={styles.tabText}>edit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5AA397',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
    paddingBottom: 70,
    alignItems: 'center',
  },

  logoutButton: {
    alignSelf: 'flex-end',
    height: '4%',
    marginTop: 20,
    marginRight: 10,
  },

  logoutText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 20,
    textDecorationLine: 'underline',
  },

  headerText: {
    alignSelf: 'flex-start',
    marginHorizontal: 35,
    marginVertical: 15,
    fontSize: 50,
    color: 'black',
    fontFamily: 'Montserrat_700Bold',
  },

  tab: {
    backgroundColor: '#F8F5F1',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    width: '85%',
    height: '6%',
    borderRadius: 20,
    paddingHorizontal: 20,
  },

  tabBoldText: {
    fontSize: 20,
    fontFamily: 'Montserrat_700Bold',
  },

  tabText: {
    fontSize: 20,
    fontFamily: 'Roboto_400Regular',
    color: '#5AA397',
  },
});
