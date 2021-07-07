import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import * as Authentication from "../../../api/auth";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";

export default ({ navigation }) => {
  const db = firebase.database();
  const [bio, setBio] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const updateBio = () => {
    db.ref("app/users/" + Authentication.getCurrentUserId()).update({
      bio: bio,
    });
  };

  useEffect(() => {
    const sub = db
      .ref("app/users/" + Authentication.getCurrentUserId() + "/bio/")
      .on("value", (snapshot) => {
        setBio(snapshot.val());
      });
    return () => sub;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={32} />
        </TouchableOpacity>

        <Text style={styles.headerText}>
          {Authentication.getCurrentUserName()}
        </Text>
      </View>

      <ScrollView style={styles.bioSpace}>
        <Text style={styles.bioHeader}>Bio:</Text>

        {showEdit === false && bio !== null && (
          <Text style={styles.bioText}>{bio}</Text>
        )}
        {showEdit === false && bio === null && (
          <Text style={styles.noBioText}>No bio yet!</Text>
        )}

        {showEdit === true && (
          <TextInput style={styles.bioText} onChangeText={setBio}>
            {bio}
          </TextInput>
        )}

        {showConfirm === false && (
          <TouchableOpacity
            style={styles.edit}
            onPress={() => {
              setShowEdit(true);
              setShowConfirm(true);
            }}
          >
            <Text style={styles.editText}>edit</Text>
          </TouchableOpacity>
        )}

        {showEdit === true && (
          <TouchableOpacity
            style={styles.edit}
            onPress={() => {
              setShowEdit(false);
              setShowConfirm(false);
              updateBio();
            }}
          >
            <Text style={styles.editText}>Confirm</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5AA397",
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
    paddingBottom: 70,
    alignItems: "flex-start",
  },

  header: {
    flexDirection: "row",
    paddingTop: "10%",
  },

  backButton: {
    marginHorizontal: "2%",
    justifyContent: "center",
  },

  headerText: {
    fontSize: 50,
    fontFamily: "Montserrat_700Bold",
  },

  bioHeader: {
    fontSize: 25,
    fontFamily: "Montserrat_700Bold",
    marginTop: "5%",
    marginBottom: "3%",
    marginHorizontal: "8%",
  },

  bioText: {
    fontSize: 20,
    fontFamily: "Roboto_400Regular",
    marginHorizontal: "8%",
    marginBottom: "2%",
  },

  noBioText: {
    fontSize: 20,
    fontFamily: "Roboto_400Regular",
    marginHorizontal: "8%",
    marginBottom: "2%",
    color: "grey",
  },

  bioSpace: {
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#F8F5F1",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: "5%",
    padding: "5%",
  },

  edit: {
    alignSelf: "flex-end",
    margin: "6%",
  },

  editText: {
    fontSize: 20,
    fontFamily: "Roboto_400Regular",
    color: "#5AA397",
    textDecorationLine: "underline",
  },
});
