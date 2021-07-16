import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Modal, Text, Image } from 'react-native';
import * as Places from '../../api/googlePlaces';
import firebase from 'firebase';
import * as Auth from '../../api/auth';

export default (props) => {
  const db = firebase.database();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('[]');
  const [photo, setPhoto] = useState('');
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selection, setSelection] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [totalVotes, setTotalVotes] = useState(Infinity);
  const [currentUser, setCurrentUser] = useState(Auth.getCurrentUserName());

  useEffect(() => {
    //set total votes
    db.ref('app/rooms/' + props.roomUID + '/details/totalVotes').once('value', (value) => {
      console.log('totalVotes:' + value.val());
      setTotalVotes(value.val());
    });

    //add place names to data
    db.ref('app/rooms/' + props.roomUID + '/polls').once('value', (value) => {
      console.log(value.val());
      value.val().forEach((object) =>
        Places.getPlaceName(object.placeId).then((element) => {
          setData((old) => [...old, { ...object, name: element.name }]);
        })
      );
    });
    return setData([]);
  }, [toggle]);

  useEffect(() => {
    //get place info when user selects one of the options
    db.ref('app/rooms/' + props.roomUID + '/polls/' + selection + '/placeId')
      .get()
      .then((value) => {
        Places.getPlaceInfo(value.val(), setName, setLocation, setPhoto);
      });
  }, [selection]);

  const handleVote = (selectedChoice) => {
    //checks if current user already voted.
    //if voted, decrease previous option's vote count by 1
    //if not voted, increase total vote count by 1
    db.ref('app/rooms/' + props.roomUID + '/participants/' + currentUser).once('value', (choice) => {
      if (choice.val() !== '-' && choice.val() !== false && choice.val() !== true) {
        db.ref('app/rooms/' + props.roomUID + '/polls/' + choice.val() + '/votes').set(firebase.database.ServerValue.increment(-1));
      } else {
        db.ref('app/rooms/' + props.roomUID + '/details/totalVotes').set(firebase.database.ServerValue.increment(1));
      }
    });

    //increment option's vote count by 1 and updates the current users selection
    db.ref('app/rooms/' + props.roomUID + '/polls/' + selection + '/votes').set(firebase.database.ServerValue.increment(1));
    db.ref('app/rooms/' + props.roomUID + '/participants').update({
      [currentUser]: selectedChoice,
    });
    setToggle(!toggle);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                setModalVisible(!modalVisible);
                setSelection(item.id);
              }}
            >
              <Text style={styles.activity}>
                {item.activity}
                {'\n'}
                {item.name}
              </Text>
              <Text style={styles.percentage}>{Math.floor((item.votes / totalVotes) * 100)}%</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTextHeader}>Name</Text>
          <Text style={styles.modalText}>{name}</Text>
          <Text style={styles.modalTextHeader}>Address</Text>
          <Text style={styles.modalText}>{location}</Text>
          <Image
            style={{ width: 150, height: 150, marginTop: 5 }}
            source={{
              uri: Places.getPlacePhoto(photo),
            }}
          />
          <Text style={styles.modalWarningText}>Voting again will change your previous vote</Text>
          <TouchableOpacity
            style={styles.modalVoteButton}
            onPress={() => {
              handleVote(selection);
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.modalVoteText}>Vote</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalCancelButton}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 400,
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  percentage: {
    paddingTop: 5,
    paddingRight: 10,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
  },

  activity: {
    paddingLeft: 10,
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

  modalVoteText: {
    fontFamily: 'Roboto_400Regular',
    alignSelf: 'center',
    color: 'white',
  },

  modalVoteButton: {
    position: 'absolute',
    bottom: '13%',
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'black',
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 30,
  },

  modalWarningText: {
    position: 'absolute',
    bottom: '21%',
    fontFamily: 'Roboto_400Regular',
  },

  modalCancelText: {
    fontFamily: 'Roboto_400Regular',
    alignSelf: 'center',
    color: 'black',
  },

  modalCancelButton: {
    position: 'absolute',
    bottom: '5%',
    borderWidth: 2,
    borderColor: 'black',

    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 30,
  },

  modalTextHeader: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  modalText: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    color: 'black',
    fontSize: 17,
    marginBottom: 10,
  },
});
