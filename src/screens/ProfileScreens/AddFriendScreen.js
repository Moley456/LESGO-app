import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import * as Friends from '../../../api/friends';
import { FontAwesome } from '@expo/vector-icons';

export default ({ navigation }) => {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const replace = [];

  const handleSearch = (text) => {
    setIsLoading(true);
    if (text !== '') {
      Friends.searchAll(text.toLowerCase()).then((snapshot) => {
        snapshot.forEach((data) => {
          replace.push(data.val());
        });
        setResults(replace);
      });
    } else {
      setResults([]);
    }
    setSearchInput(text);
  };

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
        data={results}
        renderItem={({ item, index }) => (
          <View style={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#D8D4CF' : '#E3E0DB' }]}>
            <FontAwesome name="user-circle" size={60} />
            <Text style={styles.names}>
              {item.username} {'\n'} @tag
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                Friends.sendFriendRequest(item.username);
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
