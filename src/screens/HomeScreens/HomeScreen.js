import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, Text, View, FlatList, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import firebase from 'firebase';

import * as Auth from '../../../api/auth';
import * as Maths from '../../../api/maths';
import * as Places from '../../../api/googlePlaces';

export default ({ navigation }) => {
  const db = firebase.database();
  const [upcoming, setUpcoming] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [finalArray, setFinalArray] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    refresh();
  }, [isFocused]);

  const refresh = () => {
    setRefreshing(true);

    db.ref('app/participants/' + Auth.getCurrentUserName()).once('value', (snapshot1) => {
      snapshot1.forEach((data) => {
        if (!data.val()) {
          db.ref('app/rooms/' + data.key + '/details/timeEnded')
            .get()
            .then((snapshot2) => {
              const timeEnded = Date.parse(snapshot2.val());
              const left = Maths.getTimeLeft(timeEnded);
              if (left < 0) {
                Maths.generateActivities(data.key).then((activities) => {
                  activities.forEach((activity) => {
                    Places.fetchPlaces(activity).then((placeId) => {
                      setFinalArray((old) => [...old, { placeId: placeId[0], activity: activity }]);
                      setFinalArray((old) => [...old, { placeId: placeId[1], activity: activity }]);
                    });
                  });
                });
                console.log(finalArray);
                for (let i = 0; i < 6; i++) {
                  db.ref('app/rooms/' + data.key + '/polls/' + i).update({
                    id: i,
                    placeId: finalArray[i].placeId,
                    activity: finalArray[i].activity,
                    votes: 0,
                  });
                }
                // Maths.generateActivities(data.key).then((activities) => {
                //   for (var count = 1; count <= 6; count++) {
                //     db.ref('app/rooms/' + data.key + '/polls/' + count).update({
                //       id: count,
                //       choice: activities[count - 1],
                //       votes: 0,
                //     });
                //   }
                //   /*                     fetchPlaces(activities[0]).then((value) =>
                //       addplaceID(data.key, value)
                //     ); */
                setAllParticipantsToTrue(data.key);
                setFinalArray([]);
                // });
              }
            });
        }
      });
    });

    handleInvitations();
    handleUpcoming();

    setRefreshing(false);
  };

  const setAllParticipantsToTrue = (roomUID) => {
    db.ref('app/participants/' + Auth.getCurrentUserName()).update({
      [roomUID]: true,
    });

    db.ref('app/rooms/' + roomUID + '/participants/').once('value', (snapshot) => {
      snapshot.forEach((participant) => {
        console.log(participant.key);
        db.ref('app/participants/' + participant.key + '/').update({
          [roomUID]: true,
        });
      });
    });
  };

  const handleInvitations = () => {
    setInvitations([]);
    db.ref('app/participants/' + Auth.getCurrentUserName())
      .orderByValue()
      .equalTo(false)
      .once('value', (snapshot) => {
        snapshot.forEach((data) => {
          db.ref('app/rooms/' + data.key + '/details')
            .get()
            .then((snapshot) => {
              setInvitations((old) => [...old, { ...snapshot.val(), key: data.key }]);
            });
        });
      });
  };

  const handleUpcoming = () => {
    setUpcoming([]);
    db.ref('app/participants/' + Auth.getCurrentUserName())
      .orderByValue()
      .equalTo(true)
      .once('value', (snapshot) => {
        snapshot.forEach((data) => {
          db.ref('app/rooms/' + data.key + '/details')
            .get()
            .then((snapshot) => {
              setUpcoming((old) => [...old, { ...snapshot.val(), key: data.key }]);
            });
        });
      });
  };

  const handleLogout = () => {
    Auth.signOut(
      () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Login',
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
          Welcome,{'\n'}
          {Auth.getCurrentUserName()}!
        </Text>

        <Text style={styles.subHeaderText}>Upcoming Events</Text>
      </View>
    );
  };

  const belowUpcomingEvents = () => {
    return (
      <View>
        <Text style={styles.subHeaderText}>Invitations</Text>
        {invitations.length === 0 && <Text style={styles.noText}>No invites currently.{'\n'}Start inviting your friends!</Text>}
        <FlatList data={invitations} renderItem={renderInvites} />
      </View>
    );
  };

  const noUpcomingEvents = () => {
    return (
      <View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>
          Welcome,{'\n'}
          {Auth.getCurrentUserName()}!
        </Text>

        <Text style={styles.subHeaderText}>Upcoming Events</Text>
        <Text style={styles.noText}>No upcoming events currently.{'\n'}Start inviting your friends!</Text>

        <Text style={styles.subHeaderText}>Invitations</Text>
      </View>
    );
  };

  const renderEvents = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Room', { ...item })}>
        <Text style={styles.tabBoldText}>{item.roomName}</Text>
        <Text style={styles.tabText}>{item.date}</Text>
        <Text style={styles.tabText}>{item.time}</Text>
      </TouchableOpacity>

      <Text style={styles.eventInfo}>@{item.creator}</Text>
    </View>
  );

  const renderInvites = ({ item }) => {
    const limit = Math.floor(Maths.getTimeLeft(Date.parse(item.timeEnded))) + 1;

    return (
      <View>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Invitation', { ...item })}>
          <Text style={styles.tabBoldText}>{item.roomName}</Text>
          <Text style={styles.tabText}>{item.date}</Text>
          <Text style={styles.tabText}>{item.time}</Text>
        </TouchableOpacity>

        <View style={styles.invInfo}>
          <Text>Time remaining: {limit <= 0 ? 'times up! please refresh.' : limit}</Text>
          <Text>@{item.creator}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* NO UPCOMING, NO INVITATIONS! */}
      {invitations.length === 0 && upcoming.length === 0 && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                refresh(refreshing);
              }}
            />
          }
        >
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.headerText}>
            Welcome,{'\n'}
            {Auth.getCurrentUserName()}!
          </Text>

          <Text style={styles.subHeaderText}>Upcoming Events</Text>
          <Text style={styles.noText}>No upcoming events currently.{'\n'}Start inviting your friends!</Text>
          <Text style={styles.subHeaderText}>Invitations</Text>
          <Text style={styles.noText}>No invites currently.{'\n'}Start inviting your friends!</Text>
        </ScrollView>
      )}

      {/* NO UPCOMING, GOT INVITATIONS! */}
      {upcoming.length === 0 && invitations.length !== 0 && (
        <FlatList
          data={invitations}
          renderItem={renderInvites}
          ListHeaderComponent={noUpcomingEvents}
          onRefresh={() => {
            refresh(refreshing);
          }}
          refreshing={refreshing}
        />
      )}

      {/* GOT UPCOMING, GOT/NO INVITATIONS! */}
      {upcoming.length !== 0 && (
        <FlatList
          data={upcoming}
          renderItem={renderEvents}
          ListHeaderComponent={aboveUpcomingEvents}
          ListFooterComponent={belowUpcomingEvents}
          onRefresh={() => {
            refresh(refreshing);
          }}
          refreshing={refreshing}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5AA397',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
  },

  logoutButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 10,
  },

  logoutText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 20,
    textDecorationLine: 'underline',
  },

  headerText: {
    alignSelf: 'flex-start',
    marginHorizontal: 35,
    fontSize: 50,
    color: '#F8F5F1',
    fontFamily: 'Montserrat_700Bold',
  },

  subHeaderText: {
    alignSelf: 'flex-start',
    marginHorizontal: 35,
    fontSize: 24,
    color: 'black',
    fontFamily: 'Montserrat_700Bold',
    paddingTop: 40,
  },

  tab: {
    backgroundColor: '#F8F5F1',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '85%',
    marginTop: 15,
    borderRadius: 20,
    paddingVertical: 20,
  },

  tabBoldText: {
    fontFamily: 'Roboto_900Black',
  },

  tabText: {
    fontFamily: 'Roboto_400Regular',
  },

  eventInfo: {
    alignSelf: 'flex-end',
    paddingRight: 35,
  },

  invInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 35,
  },

  noText: {
    alignSelf: 'center',
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 15,
    paddingTop: '8%',
    color: 'black',
  },
});
