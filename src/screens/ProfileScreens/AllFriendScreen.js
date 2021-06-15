import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import FriendResult from '../../components/FriendResult';
import SearchBar from '../../components/SearchBar';

export default ({ navigation }) => {
  const button = (
    <Text style={styles.actionButton} onPress={() => {}}>
      Remove
    </Text>
  );
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <View style={styles.header}>
        <FriendResult name="name" tag="@tag" actionButton={button} backgroundColor="#D8D4CF" />
        <FriendResult name="name" tag="@tag" actionButton={button} backgroundColor="#E3E0DB" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F1',
  },

  header: {
    marginTop: 20,
  },

  actionButton: {
    color: 'red',
    width: '67%',
    textAlign: 'right',
    fontSize: 18,
  },
});
