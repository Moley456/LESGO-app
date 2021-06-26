import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { getCurrentUserId, getCurrentUserName } from '../../../api/auth';
import * as Friends from '../../../api/friends';
import HideKeyboard from '../../components/HideKeyboard';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';
import { Searchbar } from 'react-native-paper';
import * as Authentication from '../../../api/auth';
import * as Maths from '../../../api/maths';


export default ({ navigation }) => {
  const db = firebase.database();
  const username = getCurrentUserName();
  const [roomName, setRoomName] = React.useState('');
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [limit, setLimit] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [baseResults, setBaseResults] = useState([]);

  const handleSearch = (text) => {
    setSearchInput(text);
    const filtered = results.filter((item) => item.username.includes(text.toLowerCase()));
    setFilteredResults(filtered);
  };

  const handleLogout = () => {
    Authentication.signOut(
      () =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        ),
      console.error
    );
  };

  const invite = () => {

    if (roomName === '' || date === '' || time === '' || limit === '') {
      Alert.alert("Please fill in every field!")
    } else if (participants.length === 0) {
      Alert.alert("No friends added!")
    } else {
      const pushedPostRef = db.ref('app/rooms/').push({ details: [1] });
      const postId = pushedPostRef.getKey();
      db.ref('app/rooms/' + postId + '/details').set({
        roomName: roomName,
        date: date,
        time: time,
        timeCreated: Maths.getCurrentTime().toString(),
        timeEnded: Maths.getTimeAfter(limit).toString(),
        creator: username,
        activity: '',
      });
  
      participants.forEach((item) => {
        db.ref('app/rooms/' + postId + '/participants').update({
          [item]: false,
        });
      });
      
      db.ref('app/rooms/' + postId + '/participants').update({
        [username]: false,
      });
  
      db.ref('app/participants/' + username).update({
        [postId]: false,
      });
  
      for (var i = 0; i < participants.length; i++) {
        db.ref('app/participants/' + participants[i]).update({
          [postId]: false,
        });
      }

      navigation.navigate('InviteSent');
    }


  };

  useEffect(() => {
    if (participants[0] !== null) {
      setFilteredResults((old) => old.filter((item) => !participants.includes(item.username)));
      setResults((old) => old.filter((item) => !participants.includes(item.username)));
    }
  }, [participants]);

  useEffect(() => {
    db.ref('app/friends/' + getCurrentUserId())
      .orderByValue()
      .equalTo(true)
      .on('value', (snapshot) => {
        setFilteredResults([]);
        setResults([]);
        snapshot.forEach((data) => {
          Friends.getUserInfo(data.key).then((snapshot) => {
            setFilteredResults((old) => [...old, snapshot.val()]);
            setResults((old) => [...old, snapshot.val()]);
            setBaseResults((old) => [...old, snapshot.val()]);
          });
        });
        setIsLoading(false);
        setBaseResults(results);
      });

    return db
      .ref('app/friends/' + getCurrentUserId())
      .orderByValue()
      .equalTo(true)
      .off('value', (snapshot) => {
        setFilteredResults([]);
        setResults([]);
        snapshot.forEach((data) => {
          Friends.getUserInfo(data.key).then((snapshot) => {
            setFilteredResults((old) => [...old, snapshot.val()]);
            setResults((old) => [...old, snapshot.val()]);
          });
        });
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    <ActivityIndicator />;
  }

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>Let's go!</Text>

        <View style={styles.row}>
          <Text style={styles.tabBoldText}>Name</Text>
          <TextInput style={styles.input} onChangeText={setRoomName} value={roomName} keyboardType={'default'} maxLength={10}></TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.tabBoldText}>Date</Text>
          <TextInput style={styles.input} onChangeText={setDate} value={date} keyboardType={'number-pad'} maxLength={8}></TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.tabBoldText}>Time</Text>
          <TextInput style={styles.input} onChangeText={setTime} value={time} keyboardType={'number-pad'} maxLength={4}></TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.tabBoldText}>Time Limit</Text>
          <TextInput
            style={[styles.input, { width: '40%' }]}
            onChangeText={setLimit}
            value={limit}
            keyboardType={'number-pad'}
            maxLength={1}
          ></TextInput>
        </View>

        <Text style={styles.tabText}>*Time for participants to indicate preferences!</Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <HideKeyboard>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Add Friends!</Text>

              <View>
                <Searchbar
                  theme={{ colors: { primary: '#5AA397' } }}
                  style={styles.search}
                  placeholder="search"
                  inputStyle={styles.inputStyle}
                  value={searchInput}
                  onChangeText={(text) => {
                    handleSearch(text);
                  }}
                />
              </View>

              <View style={{ width: '100%' }}>
                <FlatList
                  keyExtractor={(item) => item.email}
                  data={filteredResults}
                  style={styles.flatList}
                  renderItem={({ item, index }) => (
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
                        {item.username} {'\n'} @tag
                      </Text>
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => {
                          setParticipants((old) => [...old, item.username]);
                          Alert.alert('Invited ' + item.username + '!');
                        }}
                      >
                        <Text style={styles.inputStyle}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setParticipants([]);
                    setResults(baseResults);
                    setFilteredResults(baseResults);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.modalText}>Clear</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.modalText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </HideKeyboard>
        </Modal>

        <TouchableOpacity style={styles.addFriends} onPress={() => setModalVisible(true)}>
          <Text style={styles.addFriendsText}>ADD FRIENDS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.invite}
          onPress={() => {
            invite();
          }}
        >
          <Text style={styles.inviteText}>INVITE</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#5AA397',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
    paddingBottom: 70,
    alignItems: 'center',
  },

  logoutButton: {
    alignSelf: 'flex-end',
    height: '4%',
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
    marginTop: 80,
    marginBottom: 30,
    fontSize: 65,
    color: '#F8F5F1',
    fontFamily: 'Montserrat_700Bold',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },

  input: {
    backgroundColor: '#F8F5F1',
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
    fontSize: 20,
    width: '60%',
    height: '100%',
    borderRadius: 20,
    marginRight: 30,
  },

  tabBoldText: {
    fontSize: 25,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 30,
  },

  addFriends: {
    backgroundColor: '#F8F5F1',
    borderRadius: 5,
    marginTop: 25,
    marginHorizontal: 15,
    width: '85%',
    height: '6.5%',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },

  addFriendsText: {
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold',
    alignSelf: 'center',
  },

  invite: {
    backgroundColor: 'black',
    borderRadius: 5,
    margin: 15,
    width: '85%',
    height: '6.5%',
    justifyContent: 'center',
  },

  inviteText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold',
    alignSelf: 'center',
  },

  modalView: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '75%',
    height: '45%',
    marginTop: '40%',
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
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
  },

  modalText: {
    fontFamily: 'Roboto_400Regular',
    alignSelf: 'center',
    color: 'black',
  },

  modalButtons: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '15%',
    bottom: '5%',
  },

  modalButton: {
    borderWidth: 2,
    borderColor: 'black',
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  search: {
    alignSelf: 'center',
    borderRadius: 15,
    width: '90%',
    height: 35,
    marginVertical: 10,
  },

  inputStyle: {
    fontSize: 15,
    fontFamily: 'Roboto_400Regular',
  },

  listItem: {
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },

  names: {
    marginLeft: 10,
    marginVertical: 5,
  },

  addButton: {
    position: 'absolute',
    right: 15,
  },
});
