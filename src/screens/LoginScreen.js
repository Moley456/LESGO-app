import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Keyboard, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

import * as Authentication from '../../api/auth';
import HideKeyboard from '../components/HideKeyboard';

export default ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const passwordTextInput = useRef();

  const handleLogin = () => {
    Keyboard.dismiss();
    setIsLoginLoading(true);
    if (!username.trim()) {
      Alert.alert('Please enter a username');
      setIsLoginLoading(false);
      return;
    }

    var lowerCaseName = username.toLowerCase();
    Authentication.checkUsername(lowerCaseName).then((snapshot) => {
      if (snapshot.exists()) {
        const usernameObj = snapshot.val();
        Authentication.getEmail(usernameObj.id).then((snapshot) => {
          const email = snapshot.val().email;
          Authentication.signIn(
            { email, password },
            (user) =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Home',
                      params: { name: user.displayName },
                    },
                  ],
                })
              ),
            (error) => {
              switch (error.code) {
                case 'auth/user-not-found':
                  Alert.alert('Invalid username or password!', 'Please make sure you have entered a valid username and password');
                  break;
                case 'auth/wrong-password':
                  Alert.alert('Invalid username or password!', 'Please make sure you have entered a valid username and password');
                  break;
                case 'auth/invalid-email':
                  Alert.alert('Invalid Email!', 'Please make sure you have entered your email in a valid format.');
                  break;
              }
              setIsLoginLoading(false);
            }
          );
        });
      } else {
        Alert.alert('Invalid username or password!', 'Please make sure you have entered a valid username and password');
        setIsLoginLoading(false);
      }
    });
  };

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>LESGO!</Text>
        <View style={styles.toggleContainer}>
          <Text style={[styles.toggle, { fontWeight: 'bold' }]} onPress={() => navigation.navigate('Login')}>
            Sign in
          </Text>
          <Text style={styles.toggle}>|</Text>
          <Text style={styles.toggle} onPress={() => navigation.navigate('Register')}>
            Sign up
          </Text>
        </View>
        <TextInput
          maxLength={10}        
          style={styles.input}
          label="Username"
          theme={{ colors: { primary: 'black' } }}
          onChangeText={setUsername}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          value={username}
          onSubmitEditing={() => passwordTextInput.current.focus()}
          left={<TextInput.Icon name="account" color={'#5AA897'} />}
        />

        <TextInput
          ref={passwordTextInput}
          style={styles.input}
          label="Password"
          theme={{ colors: { primary: 'black', underlineColor: 'transparent', background: '#003489' } }}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          left={<TextInput.Icon name="form-textbox-password" color={'#5AA897'} />}
          right={<TextInput.Icon name={isPasswordVisible ? 'eye-off' : 'eye'} onPress={() => setIsPasswordVisible((state) => !state)} />}
        />

        <View style={styles.misc}>
          <Text style={styles.forgotPW} onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot your password?
          </Text>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleLogin} loading={isLoginLoading} disabled={isLoginLoading}>
          <Text style={styles.submitText}>SIGN IN</Text>
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
    width: 365,
    marginTop: 10,
  },

  forgotPW: {
    textDecorationLine: 'underline',
    color: 'white',
  },

  input: {
    height: 52,
    width: 365,
    backgroundColor: 'white',
    marginTop: 20,
    fontSize: 15,
  },

  submitButton: {
    backgroundColor: 'black',
    width: 365,
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
