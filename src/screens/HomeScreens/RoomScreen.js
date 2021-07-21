import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, TouchableOpacity, Image, Modal, View, FlatList, Alert } from 'react-native';
import * as Auth from '../../../api/auth';
import HideKeyboard from '../../components/HideKeyboard';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';
import * as Places from '../../../api/googlePlaces';
import * as Friends from '../../../api/friends';
import PollContainer from '../../components/PollContainer';

export default ({ navigation, route }) => {
  const db = firebase.database();
  const [modalVisible, setModalVisible] = useState(false);
  const [participants, setParticipants] = useState([]);

  const leave = () => {
    db.ref('app/participants/' + Auth.getCurrentUserName() + '/' + route.params.key).remove();

    db.ref('app/rooms/' + route.params.key + '/participants/' + Auth.getCurrentUserName()).remove();

    if (route.params.creator === Auth.getCurrentUserName()) {
      db.ref('app/rooms/' + route.params.key + '/participants/')
        .get()
        .then((snapshot) => {
          snapshot.forEach((data) => {
            db.ref('app/participants/' + data.key + '/' + route.params.key).remove();
          });
        });
      db.ref('app/rooms/' + route.params.key).remove();
    }
  };

  //TO SET PARTICIPANTS LIST
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

        <PollContainer roomUID={route.params.key} />

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
