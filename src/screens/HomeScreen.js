import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, Button, TextInput, TouchableOpacity } from 'react-native';
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Roboto_900Black } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

export default ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Welcome,Jane!</Text>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5AA897',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
        paddingBottom: 30
        
      },

    header: {
        fontSize: 40, 
        color:"black", 
        fontFamily:"Montserrat_700Bold", 
        paddingTop: 40,
        paddingLeft: 30
        
    }

})