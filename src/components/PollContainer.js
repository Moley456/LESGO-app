import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Modal, Text } from 'react-native';
import * as Places from '../../api/googlePlaces';
import firebase from 'firebase';
const totalVotes = 10;

export default (props) => {
  const db = firebase.database();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('[]');
  const [photo, setPhoto] = useState('');
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [placeName, setPlaceName] = useState('');

  useEffect(() => {
    setData([])
    db.ref('app/rooms/' + props.roomUID + '/polls').once('value', (value) => {
      value.val().forEach((object) =>
        Places.getPlaceName(object.placeId).then((element) => {
          setData((old) => [...old, {...object, name: element.name}])
        })
      );
   
    });
  }, []);

  useEffect(() => {
    db.ref('app/rooms/' + props.roomUID + '/polls/0/placeId')
      .get()
      .then((value) => {
        Places.getPlaceInfo(value.val(), setName, setLocation, setPhoto);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, separator }) => (
          <View>
            <TouchableOpacity style={styles.listItem} onPress={() => setModalVisible(!modalVisible)}>
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
          <Text style={styles.modalWarningText}>Voting again will change your previous vote</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              props.handleVote(selectedChoice);
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
    paddingTop: 8,
    paddingRight: 10,
    fontFamily: 'Montserrat_700Bold',
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
  },

  modalButton: {
    position: 'absolute',
    bottom: '12%',
    borderWidth: 2,
    borderColor: 'black',
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  modalWarningText: {
    position: 'absolute',
    bottom: '19%',
    fontFamily: 'Roboto_400Regular',
  },

  modalCancelText: {
    fontFamily: 'Roboto_400Regular',
    alignSelf: 'center',
    color: 'white',
  },

  modalCancelButton: {
    position: 'absolute',
    bottom: '5%',
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'black',
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
