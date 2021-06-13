import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Keyboard, Alert } from 'react-native';

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.resetText}>Password reset Successful!</Text>
      <Text style={styles.message}>Check your email for further instructions.</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backText}>BACK TO LOGIN</Text>
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

  resetText: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 40,
    marginBottom: 20,
  },

  message: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 18,
      color:'black',
      paddingBottom: 40
  },

  backButton: {
    backgroundColor: 'black',
    width: '90%',
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
