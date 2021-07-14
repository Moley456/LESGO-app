import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, TouchableOpacity, Image, Modal, View, FlatList, Alert } from 'react-native';
import * as Auth from '../../../api/auth';
import HideKeyboard from '../../components/HideKeyboard';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';
import * as Places from '../../../api/googlePlaces';
import * as Friends from '../../../api/friends';
import RNPoll, { IChoice } from 'react-native-poll';
import RNAnimated from 'react-native-animated-component';
import PollContainer from '../../components/PollContainer';

export default ({ navigation, route }) => {
  const db = firebase.database();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [voted, setVoted] = useState(false);
  const [votedChoice, setVotedChoice] = useState(0);
  const [choices, setChoices] = useState([]);

  /* 
  const POLL = [
    { id: 1, choice: "Karaoke", votes: 12 },
    { id: 2, choice: "Golf", votes: 1 },
    { id: 3, choice: "Badminton", votes: 3 },
    { id: 4, choice: "4th choice", votes: 5 },
    { id: 5, choice: "5th choice", votes: 9 },
    { id: 6, choice: "6th choice", votes: 5 },
  ]; */

  {
    /* TO SET CHOICES FOR POLL */
  }
  useEffect(() => {
    db.ref('app/rooms/' + route.params.key + '/participants')
      .child(Auth.getCurrentUserName())
      .once('value', (selectedChoice) => {
        console.log(selectedChoice.val());
        if (selectedChoice.val() !== '-' && selectedChoice.val() !== false) {
          setVoted(true);
          setVotedChoice(selectedChoice.val());
        }
      });
    db.ref('app/rooms/' + route.params.key + '/polls').once('value', (data) => {
      setChoices(data.val());
    });

    db.ref('app/rooms/' + route.params.key + '/participants').once('value', (selectedChoice) => {
      setTotalVotes(0);
      selectedChoice.forEach((child) => {
        if (child.val() !== '-') {
          setTotalVotes((old) => old + 1);
          console.log(totalVotes);
        }
      });
    });
  }, []);

  const handleVote = (selectedChoice) => {
    setTotalVotes((old) => old + 1);
    console.log('SelectedChoice: ', selectedChoice);
    Alert.alert('You can only vote for the activity once', 'Are you sure you want to vote for ' + selectedChoice.choice, [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          setVoted(true);
          db.ref('app/rooms/' + route.params.key + '/polls/').set(choices);

          db.ref('app/rooms/' + route.params.key + '/participants').update({
            [Auth.getCurrentUserName()]: selectedChoice.id,
          });

          navigation.goBack();
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No',
      },
    ]);
  };

  const leave = () => {
    db.ref('app/participants/' + Auth.getCurrentUserName() + '/' + route.params.key).remove();

    db.ref('app/rooms/' + route.params.key + '/participants/' + Auth.getCurrentUserName()).remove();

    if (route.params.creator === Auth.getCurrentUserName()) {
      db.ref('app/rooms/' + route.params.key).remove();
    }
  };

  /*   useEffect(() => {
    const sub = db
      .ref("app/rooms/" + route.params.key + "/details/placeID")
      .get()
      .then((value) => {
        Places.getPlaceInfo(value.val(), setName, setLocation, setPhoto);
      });

    return () => sub;
  }, []); */

  {
    /* TO SET PARTICIPANTS LIST */
  }
  useEffect(() => {
    setParticipants([]);
    const sub = db.ref('app/rooms/' + route.params.key + '/participants/').on('child_added', (snapshot) => {
      Auth.getUid(snapshot.key).then((uid) => {
        const stringUid = JSON.stringify(uid).slice(1, -1);
        Friends.getUserInfo(stringUid).then((snapshot) => {
          setParticipants((old) => [...old, snapshot.val()]);
        });
      });
    });

    return () => sub;

    /*     db.ref('app/rooms/' + route.params.key + '/participants/')
    .on('child_removed', (snapshot) => {
      console.log("removed" + snapshot.key)
    }) */
  }, []);

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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

        <Text style={styles.header}>{route.params.roomName}</Text>

        <Text style={styles.subHeader}>{route.params.date + '\n' + route.params.time}</Text>

        <PollContainer />

        {/* {voted === true && (
          <RNPoll
            appearFrom="top"
            animationDuration={200}
            totalVotes={totalVotes}
            choices={choices}
            hasBeenVoted={voted}
            votedChoiceByID={votedChoice}
            PollItemContainer={View}
            fillBackgroundColor={'#F8F5F1'}
            borderColor={'#F8F5F1'}
            style={styles.poll}
            choiceTextStyle={styles.pollText}
            percentageTextStyle={styles.pollText}
            onChoicePress={(selectedChoice) => handleVote(selectedChoice)}
          />
        )}

        {voted === false && (
          <RNPoll
            appearFrom="top"
            animationDuration={200}
            totalVotes={totalVotes}
            choices={choices}
            hasBeenVoted={voted}
            votedChoiceByID={votedChoice}
            PollItemContainer={View}
            fillBackgroundColor={'#F8F5F1'}
            borderColor={'#F8F5F1'}
            style={styles.poll}
            choiceTextStyle={styles.pollText}
            percentageTextStyle={styles.pollText}
            onChoicePress={(selectedChoice) => handleVote(selectedChoice)}
          />
        )} */}

        {/*         <Text style={styles.subHeader}>
          Activity: {"\n" + route.params.activity}
        </Text>
        <Text style={styles.subHeader}>Name of Place: {"\n" + name}</Text>
        <Text style={styles.subHeader}>Address: {"\n" + location}</Text>
        <Image
          style={{ width: 150, height: 150 }}
          source={{
            uri: Places.getPlacePhoto(photo),
          }}
        /> */}
        <TouchableOpacity style={[styles.tab, { bottom: '17%' }]} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={{ fontFamily: 'Montserrat_700Bold' }}>Participants</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Participants</Text>

            <View style={{ width: '100%', marginVertical: '5%' }}>
              <FlatList
                keyExtractor={(item) => item.email}
                data={participants}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('ViewUser', {
                        bio: item.bio,
                        name: item.username,
                      });
                    }}
                  >
                    <View
                      style={[
                        styles.listItem,
                        {
                          backgroundColor: index % 2 === 0 ? '#D8D4CF' : '#E3E0DB',
                        },
                      ]}
                    >
                      <FontAwesome name="user-circle" size={20} />
                      <Text style={styles.names}>
                        {item.username} {'\n'} @{item.username}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.modalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Chat', { ...route })}>
          <Text style={{ fontFamily: 'Montserrat_700Bold' }}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.finalTab} onPress={() => {}}>
          <Text style={{ fontFamily: 'Montserrat_700Bold', color: 'white' }}>LET'S GO!</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5AA397',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
    paddingBottom: 70,
    alignItems: 'center',
  },

  leaveButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '8%',
    right: '3%',
  },

  leaveText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'red',
  },

  backButton: {
    position: 'absolute',
    alignSelf: 'flex-start',
    top: '7%',
    left: '3%',
  },

  header: {
    fontSize: 55,
    color: '#F8F5F1',
    fontFamily: 'Montserrat_700Bold',
    marginTop: 50,
  },

  subHeader: {
    marginVertical: '2%',
    fontSize: 25,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
  },

  poll: {
    width: '85%',
    position: 'absolute',
    top: '26%',
  },

  pollText: {
    fontFamily: 'Montserrat_700Bold',
  },

  modalView: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '75%',
    height: '47%',
    marginTop: '42%',
    marginBottom: '20%',
    backgroundColor: '#F8F5F1',
    borderRadius: 20,
    paddingTop: '10%',
    shadowColor: '#000',
    position: 'absolute',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalTitle: {
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },

  modalText: {
    fontFamily: 'Roboto_400Regular',
    alignSelf: 'center',
  },

  modalButton: {
    position: 'absolute',
    bottom: '5%',
    borderWidth: 2,
    borderColor: 'black',
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  tab: {
    width: '80%',
    height: '5%',
    backgroundColor: '#F8F5F1',
    position: 'absolute',
    bottom: '10%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },

  finalTab: {
    width: '80%',
    height: '5%',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: '3%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listItem: {
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },

  names: {
    marginLeft: 10,
    marginVertical: 5,
  },
});
