import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";

import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentUserId, getCurrentUserName } from "../../../api/auth";
import firebase from "firebase";

export default ({ navigation, route }) => {
  const DATA = [
    { id: "0", activity: "Badminton", selected: false },
    { id: "1", activity: "Cafe-hopping", selected: false },
    { id: "2", activity: "Gym", selected: false },
    { id: "3", activity: "Movie", selected: false },
    { id: "4", activity: "Prawning", selected: false },
    { id: "5", activity: "Nature", selected: false },
    { id: "6", activity: "Theme Parks", selected: false },
    { id: "7", activity: "Beach", selected: false },
    { id: "8", activity: "Golf", selected: false },
    { id: "9", activity: "Bowling", selected: false },
  ];
  const db = firebase.database();
  const [budget, setBudget] = React.useState(0);
  const [data, setData] = React.useState(DATA);
  const [toggle, setToggle] = React.useState(false);

  const submit = () => {
    db.ref("app/rooms/" + route.params.key + "/participants/")
      .child(getCurrentUserName())
      .get()
      .then((snapshot) => {
        if (snapshot.val() === true) {
          Alert.alert("You can only submit once!");
        } else {
          db.ref("app/rooms/" + route.params.key + "/participants").update({
            [getCurrentUserName()]: true,
          });

          db.ref("app/rooms/" + route.params.key + "/preferences/budget")
            .get()
            .then((snapshot) => {
              const val = snapshot.child(budget).val();
              db.ref(
                "app/rooms/" + route.params.key + "/preferences/budget"
              ).update({
                [budget]: 1 + val,
              });
            });

          for (var i = 0; i < data.length; i++) {
            if (data[i].selected === true) {
              const type = data[i].activity;
              db.ref("app/rooms/" + route.params.key + "/preferences/")
                .get()
                .then((snapshot) => {
                  const val = snapshot.child(type).val();
                  db.ref(
                    "app/rooms/" + route.params.key + "/preferences/"
                  ).update({
                    [type]: 1 + val,
                  });
                });
            }
          }
        }
      });

    setData(DATA);
  };

  const leave = () => {
    db.ref(
      "app/participants/" + getCurrentUserName() + "/" + route.params.key
    ).remove();
    db.ref(
      "app/rooms/" + route.params.key + "/participants/" + getCurrentUserName()
    ).remove();

    if (route.params.creator === getCurrentUserName()) {
      db.ref("app/rooms/" + route.params.key).remove();
    }
  };

  const top = () => {
    return (
      <View style={styles.prefContainer}>
        <Text style={styles.prefHeader}>Preferences</Text>

        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Text style={[styles.subHeader, { paddingRight: "5%" }]}>$</Text>
          <Slider
            style={{ width: "70%" }}
            step={1}
            minimumValue={0}
            maximumValue={5}
            onValueChange={(value) => {
              setBudget(value);
            }}
            minimumTrackTintColor="#5AA397"
            maximumTrackTintColor="#D8D4CF"
          />
        </View>
      </View>
    );
  };

  const btm = () => {
    return (
      <View style={styles.btm}>
        <TouchableOpacity
          style={styles.okButton}
          onPress={() => {
            submit();
            navigation.goBack();
          }}
        >
          <Text style={styles.okText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.activity}>{item.activity}</Text>
      <TouchableOpacity
        style={item.selected === true ? styles.selected : styles.notSelected}
        onPress={() => {
          const updatedData = data;
          updatedData[item.id].selected = !updatedData[item.id].selected;
          setToggle(!toggle);
          setData(updatedData);
        }}
      ></TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setData(DATA);
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back" size={32} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.leaveButton}
          onPress={() => {
            leave();
            navigation.goBack();
          }}
        >
          <Text style={styles.leaveText}>Leave</Text>
        </TouchableOpacity>
        <Text style={[styles.subHeader, { fontSize: 20, marginTop: 30 }]}>
          You've been invited to
        </Text>

        <Text style={styles.header}>{route.params.roomName}!</Text>
        <Text style={styles.subHeader}>{route.params.date}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={top()}
        ListFooterComponent={btm()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5AA397",
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
  },

  topContainer: {
    alignItems: "center",
    paddingBottom: 15,
  },

  leaveButton: {
    alignSelf: "flex-end",
    marginTop: 20,
    marginRight: 10,
  },

  backButton: {
    position: "absolute",
    alignSelf: "flex-start",
    top: "3%",
    left: "3%",
  },

  leaveButton: {
    position: "absolute",
    alignSelf: "flex-end",
    top: "3%",
    right: "3%",
  },

  leaveText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
    textDecorationLine: "underline",
    color: "red",
  },
  header: {
    marginVertical: "2%",
    fontSize: 55,
    color: "#F8F5F1",
    fontFamily: "Montserrat_700Bold",
  },

  subHeader: {
    fontSize: 25,
    fontFamily: "Montserrat_700Bold",
  },

  prefContainer: {
    backgroundColor: "#F8F5F1",
    width: "100%",
    alignItems: "center",
    paddingTop: "3%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  prefHeader: {
    paddingVertical: 10,
    fontSize: 40,
    fontFamily: "Montserrat_700Bold",
    alignSelf: "center",
  },

  item: {
    backgroundColor: "#F8F5F1",
    paddingVertical: "5%",
    paddingHorizontal: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  selected: {
    backgroundColor: "#5AA397",
    borderWidth: 2,
    height: 21,
    width: 21,
    borderRadius: 15,
  },

  notSelected: {
    borderWidth: 2,
    height: 21,
    width: 21,
    borderRadius: 15,
  },

  activity: {
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
  },

  btm: {
    backgroundColor: "#F8F5F1",
    width: "100%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
  },

  okButton: {
    backgroundColor: "black",
    borderRadius: 5,
    marginTop: "8%",
    marginBottom: "10%",
    paddingVertical: "2%",
    width: "80%",
  },

  okText: {
    color: "white",
    fontSize: 15,
    fontFamily: "Montserrat_700Bold",
    alignSelf: "center",
  },
});
