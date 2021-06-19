import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { search } from '../../../api/friends';
import * as Friends from '../../../api/friends';
import { FontAwesome } from '@expo/vector-icons';

export default ({ navigation }) => {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = (text) => {
    setSearchInput(text);
    const filtered = results.filter((item) => item.username.includes(text.toLowerCase()));
    setFilteredResults(filtered);
  };

  useEffect(() => {
    const temp = [];
    Friends.searchCurrent().then((snapshot) => {
      snapshot.forEach((data) => {
        Friends.getUserInfo(data.key).then((snapshot) => {
          temp.push(snapshot.val());
        });
      });
    });
    setResults(temp);
    console.log('used');
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
            <Text style={styles.actionButton} onPress={() => {}}>
              Remove
            </Text>
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

  actionButton: {
    position: 'absolute',
    right: 10,
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
