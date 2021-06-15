import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default (props) => {
  return (
    <View style={[styles.container, { backgroundColor: props.backgroundColor }]}>
      <FontAwesome name="user-circle" size={60} />
      <Text style={styles.names}>
        {props.name} {'\n'} {props.tag}
      </Text>
      {props.actionButton}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    height: 85,
  },

  names: {
    marginLeft: 10,
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    color: 'red',
    textAlign: 'right',
  },
});
