import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { search } from '../../api/friends';

export default (props) => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <View>
      <Searchbar
        style={styles.search}
        placeholder="search"
        value={searchInput}
        onChangeText={setSearchInput}
        onSubmitEditing={props.onSubmitEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    alignSelf: 'center',
    width: '90%',
    height: 45,
    marginTop: 20,
    borderRadius: 25,
  },
});
