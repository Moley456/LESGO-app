import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import * as Authentication from '../../../api/auth';
import { Ionicons } from '@expo/vector-icons';

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
        <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} />
        </TouchableOpacity>

      <Text style={styles.headerText}>{Authentication.getCurrentUserName()}</Text>
      </View>

      <Text style={styles.bioHeader}>Bio:</Text>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5AA397',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
    paddingBottom: 70,
    alignItems: 'flex-start'
  },

  header: {
      flexDirection: 'row',
      paddingTop: '10%',
  },

  backButton: {
    marginHorizontal: "2%",
    justifyContent: 'center',    
  },

  headerText: {
    fontSize: 50,
    fontFamily: 'Montserrat_700Bold',
  },


});