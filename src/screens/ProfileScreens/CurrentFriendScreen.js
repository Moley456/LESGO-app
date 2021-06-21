import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, FlatList, ActivityIndicator, SliderComponent } from 'react-native';
import { Searchbar } from 'react-native-paper';
import * as Friends from '../../../api/friends';
import { FontAwesome } from '@expo/vector-icons';
import { getCurrentUserId } from '../../../api/auth';
import firebase from '../../../api/firebase';

export default ({ navigation }) => {
  const db = firebase.database();
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = (text) => {
    setSearchInput(text);
    const filtered = results.filter((item) => item.username.includes(text.toLowerCase()));
    setFilteredResults(filtered);
  };

  // const handleCancel = async () => {
  //   db.ref('app/users/friends/' + getCurrentUserId())
  //     .orderByValue()
  //     .startAt(false)
  //     .endAt(false)
  //     .on('value', (snapshot) => {
  //       setResults([]);
  //       setTemp([]);
  //       snapshot.forEach((data) => {
  //         Friends.getUserInfo(data.key).then((snapshot) => {
  //           console.log('reached');
  //           setTemp((old) => [...old, snapshot.val()]);
  //         });
  //       });
  //       console.log('reached');
  //       setFilteredResults(temp);
  //       console.log('line');
  //       console.log(results);
  //     });
  // };

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
          });
        });
        setIsLoading(false);
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

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Searchbar
          style={styles.search}
          placeholder="search"
          value={searchInput}
          onChangeText={(text) => {
            handleSearch(text);
          }}
        />
      </View>
      <FlatList
        keyExtractor={(item) => item.email}
        data={filteredResults}
        renderItem={({ item, index }) => (
          <View style={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#D8D4CF' : '#E3E0DB' }]}>
            <FontAwesome name="user-circle" size={60} />
            <Text style={styles.names}>
              {item.username} {'\n'} @tag
            </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => {
                Friends.deleteFriend(item.username);
              }}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F1',
    width: '100%',
  },

  header: {
    marginTop: 20,
  },

  search: {
    alignSelf: 'center',
    width: '90%',
    height: 45,
    marginVertical: 20,
    borderRadius: 25,
  },

  removeButton: {
    position: 'absolute',
    right: 10,
  },

  removeText: {
    color: 'red',
    fontSize: 18,
  },

  listItem: {
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    height: 85,
  },

  names: {
    marginLeft: 10,
  },
});