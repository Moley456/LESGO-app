import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import * as Auth from '../../../api/auth';
import HideKeyboard from '../../components/HideKeyboard';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import * as Places from '../../../api/googlePlaces';

const db = firebase.database();

export default ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState('');

  const leave = () => {
    db.ref('app/participants/' + Auth.getCurrentUserName() + '/' + route.params.key).remove();
    db.ref('app/rooms/' + route.params.key + '/participants/' + Auth.getCurrentUserName()).remove();

    if (route.params.creator === Auth.getCurrentUserName()) {
      db.ref('app/rooms/' + route.params.key).remove();
    }
  };

  useEffect(() => {
    db.ref('app/rooms/' + route.params.key + '/details/placeID')
      .get()
      .then((value) => {
        Places.getPlaceInfo(value.val(), setName, setLocation, setPhoto);
      });
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
        <Text style={styles.subHeader}>Date & Time: {'\n' + route.params.date + '   ' + route.params.time} </Text>
        <Text style={styles.subHeader}>Activity: {'\n' + route.params.activity}</Text>
        <Text style={styles.subHeader}>Name of Place: {'\n' + name}</Text>
        <Text style={styles.subHeader}>Address: {'\n' + location}</Text>
        <Image
          style={{ width: 150, height: 150 }}
          source={{
            uri: Places.getPlacePhoto(photo),
          }}
        />
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
    fontSize: 25,
    color: 'black',
    fontFamily: 'Montserrat_700Bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});
