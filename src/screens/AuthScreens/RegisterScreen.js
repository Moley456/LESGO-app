import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Keyboard, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

import * as Authentication from '../../../api/auth';
import HideKeyboard from '../../components/HideKeyboard';

export default ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const passwordTextInput = useRef();
  const emailTextInput = useRef();

  const handleRegister = () => {
    Keyboard.dismiss();
    setIsRegisterLoading(true);
    if (!username.trim()) {
      Alert.alert('Please enter a username');
      setIsRegisterLoading(false);
      return;
    }

    var lowerCaseName = username.toLowerCase();
    Authentication.checkUsername(lowerCaseName).then((snapshot) => {
      if (!snapshot.exists()) {
        Authentication.createAccount(
          { username: lowerCaseName, email, password },
          (user) => {
            Authentication.writeUserData(email);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'RegisterSuccess',
                    params: { name: user.displayName },
                  },
                ],
              })
            );
          },

          (error) => {
            switch (error.code) {
              case 'auth/email-already-in-use':
                Alert.alert('Email already in use!', 'Please try again with another email.');
                break;
              case 'auth/weak-password':
                Alert.alert('Invalid password!', 'Password must be at least 6 characters long.');
                break;
              case 'auth/invalid-email':
                Alert.alert('Invalid Email!', 'Please make sure you have entered your email in a valid format.');
                break;
            }
            setIsRegisterLoading(false);
          }
        );
      } else {
        Alert.alert('Username is already taken, please try another a different username');
        setIsRegisterLoading(false);
      }
    });
  };

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>LESGO!</Text>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggle} onPress={() => navigation.navigate('Login')}>
            Sign in
          </Text>
          <Text style={styles.toggle}>|</Text>
          <Text style={[styles.toggle, { fontWeight: 'bold' }]} onPress={() => navigation.navigate('Register')}>
            Sign up
          </Text>
        </View>

        <TextInput
          maxLength={10}
          style={styles.input}
          label="Username"
          theme={{ colors: { primary: 'black' } }}
          onChangeText={setUsername}
          autoCapitalize="none"
          returnKeyType="next"
          value={username}
          onSubmitEditing={() => emailTextInput.current.focus()}
          left={<TextInput.Icon name="account" color={'#5AA897'} />}
        />

        <TextInput
          ref={emailTextInput}
          style={styles.input}
          label="Email"
          theme={{ colors: { primary: 'black' } }}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          value={email}
          onSubmitEditing={() => passwordTextInput.current.focus()}
          left={<TextInput.Icon name="at" color={'#5AA897'} />}
        />

        <TextInput
          ref={passwordTextInput}
          style={styles.input}
          label="Password"
          theme={{ colors: { primary: 'black' } }}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          left={<TextInput.Icon name="form-textbox-password" color={'#5AA897'} />}
          right={<TextInput.Icon name={isPasswordVisible ? 'eye-off' : 'eye'} onPress={() => setIsPasswordVisible((state) => !state)} />}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleRegister} loading={isRegisterLoading} disabled={isRegisterLoading}>
          <Text style={styles.submitText}>NEXT</Text>
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
    paddingBottom: 25,
  },

  logo: {
    fontSize: 72,
    color: 'black',
    fontFamily: 'Montserrat_700Bold',
    paddingBottom: 10,
  },

  toggleContainer: {
    flexDirection: 'row',
  },

  toggle: {
    color: '#fff',
    fontSize: 15,
    paddingHorizontal: 20,
  },

  misc: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
    marginTop: 10,
  },

  forgotPW: {
    textDecorationLine: 'underline',
    color: 'white',
  },

  input: {
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    marginTop: 20,
    fontSize: 15,
  },

  submitButton: {
    backgroundColor: 'black',
    width: '90%',
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 30,
  },

  submitText: {
    fontFamily: 'Roboto_900Black',
    color: 'white',
    textAlign: 'center',
  },
});
