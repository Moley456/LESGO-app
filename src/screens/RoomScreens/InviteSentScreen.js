import React from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, TouchableOpacity} from 'react-native';
import { CommonActions } from '@react-navigation/native';

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sentText}>Invite Sent!</Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'Main',
                },
              ],
            })
          )
        }
      >
        <Text style={styles.backText}>HOME</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5AA897',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
  },

  sentText: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 48,
    marginBottom: 30,
    alignSelf: 'flex-start',
    marginHorizontal: 20
  },

  backButton: {
    backgroundColor: 'black',
    width: '90%',
    paddingVertical: 20,
    borderRadius: 15,
    marginBottom: 50,
  },

  backText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Roboto_900Black',
    textAlign: 'center',
  },
});
