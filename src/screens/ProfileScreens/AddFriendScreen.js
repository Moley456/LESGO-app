import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import SearchBar from '../../components/SearchBar';
import * as Friends from '../../../api/friends';
import { FontAwesome } from '@expo/vector-icons';
import firebase from '../../../api/firebase';
import { getCurrentUserId, getCurrentUserName } from '../../../api/auth';

export default ({ navigation }) => {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFriends, setCurrentFriends] = useState([]);
  const db = firebase.database();

  const handleAdd = (username) => {
    Friends.sendFriendRequest(username);
    db.ref('app/friends/' + getCurrentUserId())
      .orderByValue()
      .startAt()
      .once('value', (snapshot) => {
        setCurrentFriends([]);
        snapshot.forEach((data) => {
          Friends.getUserInfo(data.key).then((snapshot) => {
            setCurrentFriends((old) => [...old, snapshot.val()]);
          });
        });
        setIsLoading(false);
      });
    Alert.alert('Friend request sent to ' + username + '!');
    setResults((old) => old.filter((item) => item.username !== username));
  };

  const handleSearch = (text) => {
    const replace = [];
    setIsLoading(true);
    if (text !== '') {
      Friends.searchAll(text.toLowerCase()).then((snapshot) => {
        snapshot.forEach((data) => {
          replace.push(data.val());
        });
        if (currentFriends[0] !== null) {
          const res = replace.filter((item) => {
            return !currentFriends.some((item2) => {
              return item2.username === item.username || item.username === getCurrentUserName();
            });
          });
          setResults(res);
        } else {
          setResults(replace);
        }
      });
    } else {
      setResults([]);
    }
    setSearchInput(text);
  };

  useEffect(() => {
    db.ref('app/friends/' + getCurrentUserId())
      .orderByValue()
      .on('value', (snapshot) => {
        setCurrentFriends([]);
        snapshot.forEach((data) => {
          Friends.getUserInfo(data.key).then((snapshot) => {
            setCurrentFriends((old) => [...old, snapshot.val()]);
          });
        });
      });
    return db
      .ref('app/friends/' + getCurrentUserId())
      .orderByValue()
      .on('value', (snapshot) => {
        setCurrentFriends([]);
        snapshot.forEach((data) => {
          Friends.getUserInfo(data.key).then((snapshot) => {
            setCurrentFriends((old) => [...old, snapshot.val()]);
          });
        });
      });
  }, []);

  if (isLoading) {
    <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SearchBar
          value={searchInput}
          onChangeText={(text) => {
            handleSearch(text);
          }}
        />
      </View>
      <FlatList
        keyExtractor={(item) => item.email}
        data={results}
        renderItem={({ item, index }) => (
          <View style={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#D8D4CF' : '#E3E0DB' }]}>
            <FontAwesome name="user-circle" size={50} />
            <Text style={styles.names}>
              {item.username} {'\n'} @tag
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                handleAdd(item.username);
              }}
            >
              <Text style={styles.addText}>Add</Text>
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

  addButton: {
    position: 'absolute',
    right: 10,
  },

  addText: {
    color: 'black',
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
