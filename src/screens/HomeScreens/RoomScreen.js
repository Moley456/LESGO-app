import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import * as Authentication from '../../../api/auth';
import HideKeyboard from '../../components/HideKeyboard';
import { Ionicons } from '@expo/vector-icons';


export default ({ navigation, route}) => {
  const [roomName, setRoomName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [limit, setLimit] = React.useState("");


  return (
    <HideKeyboard>

    <SafeAreaView style={styles.container}>

    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={32}/>
        </TouchableOpacity>

    <TouchableOpacity style={styles.leaveButton} onPress={() => {}}>
          <Text style={styles.leaveText}>Leave</Text>
        </TouchableOpacity>

      <Text style={styles.creator}>{route.params.creator}</Text>
      <Text style={styles.header}>{route.params.roomName}</Text>
      <Text style={styles.subHeader}>{route.params.date}</Text>
      <Text style={styles.subHeader}>{route.params.activity}</Text>
    </SafeAreaView>
    </HideKeyboard>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5AA397",
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
    paddingBottom: 70,
    alignItems: "center",
    justifyContent: "center"
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

  backButton: {
    position: "absolute",
    alignSelf: "flex-start",
    top: "7%",
    left: "3%"
  },
  
  creator: {
    fontSize: 25,
    color: "black",
    fontFamily: "Montserrat_700Bold",
  },

  header: {
    fontSize: 55,
    color: "#F8F5F1",
    fontFamily: "Montserrat_700Bold",
  },

  subHeader: {
    fontSize: 25,
    color: "black",
    fontFamily: "Montserrat_700Bold",
  }

});
