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

export default ({ navigation }) => {
  const [roomName, setRoomName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [limit, setLimit] = React.useState("");

  const handleLogout = () => {
    Authentication.signOut(
      () =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        ),
      console.error
    );
  };

  return (
    <HideKeyboard>

    <SafeAreaView style={styles.container}>
      <Text> invitation screen </Text>
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
  },

});
