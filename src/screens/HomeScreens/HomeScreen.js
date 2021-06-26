import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import firebase from "firebase";
import { getCurrentUserId, getCurrentUserName } from "../../../api/auth";
import * as Authentication from "../../../api/auth";
import * as Maths from "../../../api/maths";

export default ({ navigation }) => {
  const db = firebase.database();
  const [upcoming, setUpcoming] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    console.log("refresh");
    setRefreshing(true);

    db.ref("app/participants/" + getCurrentUserName())
      .orderByValue()
      .on("value", (snapshot1) => {
        snapshot1.forEach((data) => {
          db.ref("app/rooms/" + data.key + "/details/timeEnded")
            .get()
            .then((snapshot2) => {
              const timeEnded = Date.parse(snapshot2.val());
              const left = Maths.getTimeLeft(timeEnded);
              if (left < 0) {
                db.ref("app/participants/" + getCurrentUserName()).update({
                  [data.key]: true,
                });
              } else {
                db.ref("app/participants/" + getCurrentUserName()).update({
                  [data.key]: false,
                });
              }
            });
        });
      });
      
      handleInvitations();
      handleUpcoming();

      setRefreshing(false);
  };

  const handleInvitations = () => {
    db.ref("app/participants/" + getCurrentUserName())
      .orderByValue()
      .equalTo(false)
      .on("value", (snapshot) => {
        setInvitations([]);
        snapshot.forEach((data) => {
          db.ref("app/rooms/" + data.key + "/details")
            .get()
            .then((snapshot) => {
              setInvitations((old) => [
                ...old,
                { ...snapshot.val(), key: data.key },
              ]);
            });
        });
      });

    console.log("inv");

    db.ref("app/participants/" + getCurrentUserName())
    .orderByValue()
    .equalTo(false)
    .off("value", (snapshot) => {
      setInvitations([]);
      snapshot.forEach((data) => {
        db.ref("app/rooms/" + data.key + "/details")
          .get()
          .then((snapshot) => {
            setInvitations((old) => [
              ...old,
              { ...snapshot.val(), key: data.key },
            ]);
          });
      });
    });
  }

  const handleUpcoming = () => {
    db.ref("app/participants/" + getCurrentUserName())
      .orderByValue()
      .equalTo(true)
      .on("value", (snapshot) => {
        setUpcoming([]);
        snapshot.forEach((data) => {
          db.ref("app/rooms/" + data.key + "/details")
            .get()
            .then((snapshot) => {
              setUpcoming((old) => [
                ...old,
                { ...snapshot.val(), key: data.key },
              ]);
            });
        });
      });

    console.log("upcoming");

    db.ref("app/participants/" + getCurrentUserName())
    .orderByValue()
    .equalTo(true)
    .off("value", (snapshot) => {
      setUpcoming([]);
      snapshot.forEach((data) => {
        db.ref("app/rooms/" + data.key + "/details")
          .get()
          .then((snapshot) => {
            setUpcoming((old) => [
              ...old,
              { ...snapshot.val(), key: data.key },
            ]);
          });
      });
    });
  }

  useEffect(() => {
    refresh();
  }, []);


  const handleLogout = () => {
    Authentication.signOut(
      () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "Login",
              },
            ],
          })
        );
      },
      (error) => console.log(error)
    );
  };

  const aboveUpcomingEvents = () => {
    return (
      <View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>
          Welcome,{"\n"}
          {Authentication.getCurrentUserName()}!
        </Text>

        <Text style={styles.subHeaderText}>Upcoming Events</Text>
      </View>
    );
  };

  const belowUpcomingEvents = () => {
    return (
      <View>
        <Text style={styles.subHeaderText}>Invitations</Text>
        <FlatList
          data={invitations}
          renderItem={renderInvites}
          keyExtractor={(item) => {
            item.key;
          }}
        />
      </View>
    );
  };

  const renderEvents = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate("Room", { ...item })}
      >
        <Text style={styles.tabBoldText}>{item.roomName}</Text>
        <Text style={styles.tabText}>{item.date}</Text>
        <Text style={styles.tabText}>{item.activity}</Text>
      </TouchableOpacity>

      <Text style={styles.eventInfo}>@{item.creator}</Text>
    </View>
  );

  const renderInvites = ({ item }) => {
    const limit = Math.floor(Maths.getTimeLeft(Date.parse(item.timeEnded)));

    return (
      <View>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Invitation", { ...item })}
        >
          <Text style={styles.tabBoldText}>{item.roomName}</Text>
          <Text style={styles.tabText}>{item.date}</Text>
          <Text style={styles.tabText}>{item.date}</Text>
        </TouchableOpacity>

        <View style={styles.invInfo}>
          <Text>Time remaining: {limit}</Text>
          <Text>@{item.creator}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={upcoming}
        renderItem={renderEvents}
        keyExtractor={(item) => {
          item.key;
        }}
        ListHeaderComponent={aboveUpcomingEvents}
        ListFooterComponent={belowUpcomingEvents}
        onRefresh={() => {refresh(refreshing)}}
        refreshing={refreshing}
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

  logoutButton: {
    alignSelf: "flex-end",
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
    fontSize: 50,
    color: "#F8F5F1",
    fontFamily: "Montserrat_700Bold",
  },

  subHeaderText: {
    alignSelf: "flex-start",
    marginHorizontal: 35,
    fontSize: 24,
    color: "black",
    fontFamily: "Montserrat_700Bold",
    paddingTop: 40,
  },

  tab: {
    backgroundColor: "#F8F5F1",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: "85%",
    marginTop: 15,
    borderRadius: 20,
    paddingVertical: 20,
  },

  tabBoldText: {
    fontFamily: "Roboto_900Black",
  },

  tabText: {
    fontFamily: "Roboto_400Regular",
  },

  eventInfo: {
    alignSelf: "flex-end",
    paddingRight: 35,
  },

  invInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 35,
  },
});
