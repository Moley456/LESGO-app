import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import * as Authentication from '../../../api/auth';
import HideKeyboard from '../../components/HideKeyboard';
import { Ionicons } from '@expo/vector-icons';


export default ({ navigation, route }) => {
  const [roomName, setRoomName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [limit, setLimit] = React.useState("");


  return (

    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={32}/>
        </TouchableOpacity>

    <TouchableOpacity style={styles.leaveButton} onPress={() => {}}>
          <Text style={styles.leaveText}>Leave</Text>
        </TouchableOpacity>
    <Text style={[styles.header, {fontSize: 20, marginTop: 30}]}>You've been invited to</Text>
      <Text style={styles.header}>{route.params.roomName}!</Text>
      <Text style={styles.subHeader}>{route.params.date}</Text>


    <View style={styles.prefContainer}>
      <Text style={styles.prefHeader}>Preferences</Text>
      <View style={styles.budget}><Text  style={{fontSize: 100}}>Budget</Text></View>
      <View style={styles.budget}><Text  style={{fontSize: 100}}>Budget</Text></View>

      <View style={styles.budget}><Text  style={{fontSize: 100}}>Budget</Text></View>
      <View style={styles.budget}><Text  style={{fontSize: 100}}>Budget</Text></View>
      <View style={styles.budget}><Text  style={{fontSize: 100}}>Budget</Text></View>
      <View style={styles.budget}><Text  style={{fontSize: 100}}>Budget</Text></View>
      <View style={styles.budget}><Text  style={{fontSize: 100}}>Budget</Text></View>



    </View>

    
    </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5AA397",
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
  },

  scrollContainer: {
    alignItems: "center"
  },

  leaveButton: {
    alignSelf: "flex-end",
    marginTop: 20,
    marginRight: 10,
  },

  backButton: {
    position: "absolute",
    alignSelf: "flex-start",
    top: "7%",
    left: "3%"
  },

  leaveButton: {
    position: "absolute",
    alignSelf: "flex-end",
    top: "8%",
    right: "3%",
  },
  
  leaveText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
    textDecorationLine: "underline",
  },
  header: {
    marginVertical: "1%",
    fontSize: 55,
    color: "#F8F5F1",
    fontFamily: "Montserrat_700Bold",
  },

  subHeader: {
    fontSize: 25,
    color: "black",
    fontFamily: "Montserrat_700Bold",
  },
  
  prefContainer: {
    marginTop: 30,
    backgroundColor: "#F8F5F1",
    width: "100%",
  },

  prefHeader: {
    paddingVertical: 10,
    fontSize: 40,
    color: "black",
    fontFamily: "Montserrat_700Bold",
    alignSelf: "center"
  },

  prefText: {
    fontSize: 20,
    color: "black",
    fontFamily: "Montserrat_700Bold",
  },
  
  budget: {
    height: 100,
  }

});

