import React from "react";
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

import * as Authentication from "../../../api/auth";

const UPCOMING = [
  {
    id: "id1",
    name: "Girl's Out",
    date: "1 June, 12.30pm",
    activity: "Beach at Sentosa",
    creator: "Kate",
  },
  {
    id: "id2",
    name: "ROLL OUT",
    date: "6 June, 10.30am",
    activity: "sleeping at home",
    creator: "Jane",
  },
  {
    id: "id3",
    name: "ROLL IN",
    date: "6 June, 4am",
    activity: "Bowling at Kallang",
    creator: "Pete",
  },
];

const INVITES = [
  {
    id: "id1",
    name: "TGIF",
    date: "10 June, 12.30pm",
    activity: "Cherry Club",
    creator: "OXW",
    timeRemaining: "10 hours"
  },
  {
    id: "id2",
    name: "sunday fun",
    date: "6 June, 6pm",
    activity: "RYAN HOUSE",
    creator: "Ryan",
    timeRemaining: "3 hours"
  }
];

export default ({ navigation }) => {
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
        data={INVITES}
        renderItem={renderInvites}
        keyExtractor={(item) => item.id}
      />
      </View>
    );
  };

  const renderEvents = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate("Room")}
      >
        <Text style={styles.tabBoldText}>{item.name}</Text>
        <Text style={styles.tabText}>{item.date}</Text>
        <Text style={styles.tabText}>{item.activity}</Text>
      </TouchableOpacity>

      <Text style={styles.eventInfo}>@{item.creator}</Text>
    </View>
  );

  const renderInvites = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate("Invitation")}
      >
        <Text style={styles.tabBoldText}>{item.name}</Text>
        <Text style={styles.tabText}>{item.date}</Text>
        <Text style={styles.tabText}>{item.activity}</Text>
      </TouchableOpacity>

      <View style={styles.invInfo}>
          <Text>Time remaining: {item.timeRemaining}</Text>
          <Text>@{item.creator}</Text>
        </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={UPCOMING}
        renderItem={renderEvents}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={aboveUpcomingEvents}
        ListFooterComponent={belowUpcomingEvents}
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
