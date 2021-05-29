import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Keyboard, Alert } from 'react-native';

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.signUpText}>Sign Up SuccessFul!</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5AA897',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
  },

  signUpText: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 48,
    marginLeft: 30,
    marginBottom: 50,
  },

  backButton: {
    backgroundColor: 'black',
    width: 365,
    paddingVertical: 20,
    borderRadius: 15,
    marginBottom: 50,
  },

  backText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Roboto_900Black',
    textAlign: 'center',
  },
});
