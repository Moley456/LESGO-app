import React from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';

export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text> AllFriendScreen </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5AA397',
    alignItems: 'center',
  },
});
