import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Keyboard, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

import * as Authentication from '../../../api/auth';
import HideKeyboard from '../../components/HideKeyboard';

export default ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleReset = () => {
    Keyboard.dismiss();
    Authentication.resetPassword(
      { email },
      () => navigation.navigate('ResetSuccess'),
      (error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            Alert.alert('Invalid Email!', 'Please make sure you have entered your email in a valid format.');
            break;
          case 'auth/user-not-found':
            Alert.alert('Invalid Email!', 'Please make sure you have entered a valid email address.');
        }
        setIsLoginLoading(false);
      }
    );
  };

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>Reset Password</Text>
        <Text style={styles.message}>Enter your email address below:</Text>
        <TextInput
          style={styles.input}
          label="Email"
          theme={{ colors: { primary: 'black' } }}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          value={email}
          left={<TextInput.Icon name="account" color={'#5AA897'} />}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleReset} loading={isLoginLoading} disabled={isLoginLoading}>
          <Text style={styles.submitText}>RESET</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backText}>BACK TO LOGIN</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5AA897',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
    paddingBottom: 70,
  },

  logo: {
    fontSize: 55,
    color: 'black',
    fontFamily: 'Montserrat_700Bold',
    paddingBottom: 20,
    alignSelf: 'flex-start',
    marginHorizontal: 15
  },

  message: {
    fontSize: 18,
    fontFamily: 'Roboto_400Regular',
    color: 'white',
  },

  input: {
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    marginTop: 10,
    fontSize: 15,
  },

  submitButton: {
    backgroundColor: 'black',
    width: '90%',
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 30,
  },

  backButton: {
    backgroundColor: 'white',
    width: '90%',
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 20,
  },

  submitText: {
    fontFamily: 'Roboto_900Black',
    color: 'white',
    textAlign: 'center',
  },

  backText: {
    fontFamily: 'Roboto_900Black',
    color: 'black',
    textAlign: 'center',
  },
});
