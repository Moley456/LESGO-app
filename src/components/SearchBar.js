import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default (props) => {
  return (
    <View>
      <Searchbar
        theme={{ colors: { primary: '#5AA397' } }}
        style={styles.search}
        placeholder="search"
        inputStyle={styles.inputStyle}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    alignSelf: 'center',
    width: '90%',
    height: 45,
    marginVertical: 20,
    borderRadius: 15,
  },
  inputStyle: {
    fontFamily: 'Roboto_400Regular',
  },
});
