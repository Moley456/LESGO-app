import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import * as Authentication from "../../../api/auth";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";

export default ({ navigation, route }) => {
  const db = firebase.database();
  const [bio, setBio] = useState("");

  useEffect(() => {

    if (route.params.bio === undefined) {
    const sub = db
      .ref("app/users/" + route.params._id + "/bio/")
      .once("value", (snapshot) => {
        setBio(snapshot.val());
      });
      return () => sub;
    } else {
      setBio(route.params.bio);
    }

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

        <Text style={styles.headerText}>{route.params.name}</Text>
      </View>

      <ScrollView style={styles.bioSpace}>
        <Text style={styles.bioHeader}>Bio:</Text>

        {bio !== null && <Text style={styles.bioText}>{bio}</Text>}
        {bio === null && <Text style={styles.noBioText}>No bio yet!</Text>}
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
});
