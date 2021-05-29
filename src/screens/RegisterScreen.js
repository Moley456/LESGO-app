import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, Button, TextInput, TouchableOpacity } from 'react-native';
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Roboto_900Black } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';



export default ({ navigation }) => {
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
        <View style={styles.toggleContainer}>
          <Text style={styles.toggle} onPress={() => navigation.navigate("Login")} >Sign in</Text>
          <Text style={styles.toggle} onPress={() => {}} >|</Text>
          <Text style={[styles.toggle, { fontWeight:"bold"}]} onPress={() => navigation.navigate("Register")}>Sign up</Text>
        </View>
        
        <TextInput style={styles.input} placeholder="username"></TextInput>
        <TextInput style={styles.input} placeholder="password"></TextInput>
        <TextInput style={styles.input} placeholder="confirm password"></TextInput>

        <TouchableOpacity style={{backgroundColor: "black", width:365, paddingVertical: 15, borderRadius:15, marginTop:30}} onPress={() => navigation.navigate("Login")}>
          <Text style={{fontFamily:"Roboto_900Black", color:"white", textAlign:'center', }}>NEXT</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5AA897',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
      paddingBottom: 30
      
    },
    
    logo: {
      fontSize: 72, 
      color:"black", 
      fontFamily:"Montserrat_700Bold", 
      alignItems: 'center',
      justifyContent: 'center',
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
      paddingHorizontal: 20,
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
      fontFamily: "Roboto",
      marginTop: 20,
      paddingLeft: 15,
      fontSize: 15,
      borderRadius:15
    }

  });
  