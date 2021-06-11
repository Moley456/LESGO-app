import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Keyboard, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.signUpText}>Sign Up Successful!</Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'Main',
                },
              ],
            })
          )
        }
      >
        <Text style={styles.backText}>HOME</Text>
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
    marginBottom: 30,
    alignSelf: 'flex-start',
    marginLeft: 30
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
