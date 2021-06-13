import React from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('UserProfile')}
      >
        <Text style={styles.logoutText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Add Friends</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5AA397",
    alignItems: "center",
  },

  header: {
    alignSelf: "flex-start",
    marginHorizontal: 35,
    marginTop: 30,
    marginBottom: 30,
    fontSize: 45,
    color: "#F8F5F1",
    fontFamily: "Montserrat_700Bold",
  },

  logoutButton: {
    alignSelf: "flex-start",
    height: "4%",
    marginTop: 20,
    marginLeft: 10,
  },

  logoutText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
    textDecorationLine: "underline",
  },
});
