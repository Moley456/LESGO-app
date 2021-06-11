import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper'
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Roboto_900Black } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';


const FirstRoute = () => (
    <LoginScreen/>
);

const SecondRoute = () => (
    <RegisterScreen/>
);

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#5AA897' }}
      labelStyle={{fontSize:15}}
    />
  );  
export default ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Sign in' },
    { key: 'second', title: 'Sign up' },
  ]);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [user, setUser] = useState("");
  const passwordTextInput = useRef();

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Roboto_900Black
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
    
  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>LESGO!</Text>
        <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.navigation}
        />
        {/* <View style={styles.toggleContainer}>
          <Text style={[styles.toggle, { fontWeight:"bold"}]} onPress={() => navigation.navigate("Login")} >Sign in</Text>
          <Text style={styles.toggle}>|</Text>
          <Text style={styles.toggle} onPress={() => navigation.navigate("Register")}>Sign up</Text>
        </View>
        
        <TextInput 
        style={styles.input} 
        label="Username" 
        theme={{ colors: {primary: 'black'}}}
        onChangeText={setUser}
        returnKeyType="next"
        value={user}
        onSubmitEditing={() => passwordTextInput.current.focus()}
        left={<TextInput.Icon name="account" color={'#5AA897'} />}
        />

        <TextInput 
        ref={passwordTextInput}
        style={styles.input} 
        label="Password" 
        theme={{ colors: {primary: 'black',underlineColor:'transparent', background : '#003489'}}}
        onChangeText={setPassword}
        secureTextEntry={!isPasswordVisible}
        left={<TextInput.Icon name="form-textbox-password" color={"#5AA897"} />}
        right={<TextInput.Icon name={isPasswordVisible ? "eye-off" : "eye"} onPress={() => setIsPasswordVisible((state) => !state)} />}
        />

        <View style={styles.misc}>
          <Text style={styles.forgotPW} onPress={() => {}}>Forgot your password?</Text>
        </View>
        <TouchableOpacity style={{backgroundColor: "black", width:365, paddingVertical: 15, borderRadius:15, marginTop:30}}>
          <Text style={{fontFamily:"Roboto_900Black", color:"white", textAlign:'center'}} onPress={() => navigation.navigate("Home")}>SIGN IN</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5AA897',
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
      paddingBottom: 70
      
    },

    navigation: {
        marginTop: StatusBar.currentHeight,

    },
    
    logo: {
      fontSize: 72, 
      color:"black", 
      fontFamily:"Montserrat_700Bold", 
      textAlign:'center',
      paddingBottom: 10
    },

    toggleContainer: {
      flexDirection: 'row'
    },

    toggle: {
      color:"#fff", 
      fontSize:15,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20
    },

    misc: {
      flexDirection:'row',
      justifyContent:'flex-end',
      width: 365,
      marginTop:10
    },

    forgotPW: {
      textDecorationLine:'underline',
      color:'white'
    },

    input: {
      height: 52,
      width: 365,
      backgroundColor: "white",
      marginTop: 20,
      fontSize: 15,
      
    },

    scene: {
        flex: 1,
      },

  });
  