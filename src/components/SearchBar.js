import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default () => {
  return (
    <View>
      <Searchbar style={styles.search} placeholder="search" />
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
