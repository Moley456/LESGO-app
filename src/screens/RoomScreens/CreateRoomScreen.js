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
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

        <Text style={styles.headerText}>Let's go!</Text>

        <View style={styles.row}>
          <Text style={styles.tabBoldText}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setRoomName}
            value={roomName}
            keyboardType={"default"}
            maxLength={12}
          ></TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.tabBoldText}>Date</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDate}
            value={date}
            keyboardType={"number-pad"}
            maxLength={8}
          ></TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.tabBoldText}>Time</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTime}
            value={time}
            keyboardType={"number-pad"}
            maxLength={4}
          ></TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.tabBoldText}>Time Limit</Text>
          <TextInput
            style={[styles.input, {width: '40%'}]}
            onChangeText={setLimit}
            value={limit}
            keyboardType={'number-pad'}
            maxLength={2}
          ></TextInput>
        </View>

        <Text style={styles.tabText}>*Time for participants to indicate preferences!</Text>

        <TouchableOpacity style={styles.addFriends} onPress={() => {}}>
            <Text style={styles.addFriendsText}>ADD FRIENDS</Text>
        </TouchableOpacity>



        <TouchableOpacity style={styles.invite} onPress={() => {navigation.navigate('InviteSent')}}>
            <Text style={styles.inviteText}>INVITE</Text>
        </TouchableOpacity>

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

  logoutButton: {
    alignSelf: 'flex-end',
    height: '4%',
    marginTop: 20,
    marginRight: 10,
  },

  logoutText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
    textDecorationLine: "underline",
  },

  headerText: {
    alignSelf: "flex-start",
    marginHorizontal: 35,
    marginTop: 80,
    marginBottom: 30,
    fontSize: 65,
    color: "#F8F5F1",
    fontFamily: "Montserrat_700Bold",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15
  },

  input: {
    backgroundColor: "#F8F5F1",
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
    fontSize: 20,
    width: '60%',
    height: '100%',
    borderRadius: 20,
    marginRight: 30,
  },

  tabBoldText: {
    fontSize: 25,
    fontFamily: "Montserrat_700Bold",
    marginLeft: 30,
  },

  addFriends: {
    backgroundColor: "#F8F5F1",
    borderRadius: 5,
    marginTop: 25,
    marginHorizontal: 15,
    width: '85%',
    height: '6.5%',
    justifyContent:'center',
    borderWidth: 2,
    borderColor: 'black'
  },

  addFriendsText: {
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    alignSelf: 'center',
  },

  invite: {
    backgroundColor: "black",
    borderRadius: 5,
    margin: 15,
    width: '85%',
    height: '6.5%',
    justifyContent:'center'
  },

  inviteText: {
    color: 'white',
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    alignSelf: 'center',
  }

});
