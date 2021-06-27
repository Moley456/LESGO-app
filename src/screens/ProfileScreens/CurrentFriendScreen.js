import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, FlatList, ActivityIndicator, SliderComponent } from 'react-native';
import SearchBar from '../../components/SearchBar';
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
