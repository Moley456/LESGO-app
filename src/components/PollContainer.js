import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Modal, Text } from 'react-native';

export default (props) => {
  const totalVotes = 10;
  const DATA = [
    { id: 1, activity: 'Karaoke', votes: 12 },
    { id: 2, activity: 'Golf', votes: 1 },
    { id: 3, activity: 'Badminton', votes: 3 },
    { id: 4, activity: '4th choice', votes: 5 },
    { id: 5, activity: '5th choice', votes: 9 },
    { id: 6, activity: '6th choice', votes: 5 },
  ];
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ backgroundColor: 'black' }}
        data={DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, separator }) => {
          <View>
            <Text>hi</Text>
            <TouchableOpacity style={styles.listItem}>
              <Text>{item.activity}</Text>
              <Text>{Math.floor(item.votes / totalVotes) * 100}%</Text>
            </TouchableOpacity>
            ;
          </View>;
        }}
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
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.modalText}>Vote</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '80%',
    height: 400,
  },

  listItem: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
