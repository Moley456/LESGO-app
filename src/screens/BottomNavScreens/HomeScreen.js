import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import * as Authentication from '../../../api/auth';

export default ({ navigation }) => {
  const handleLogout = () => {
    Authentication.signOut(
      () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Login',
              },
            ],
          })
        );
      },
      (error) => console.log(error)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.headerStyle}>
          <Text style={styles.headerText}>
            Welcome,{'\n'}
            {Authentication.getCurrentUserName()}!
          </Text>
        </View>

        <View style={styles.headerStyle}>
          <Text style={styles.subHeaderText}>Upcoming Events</Text>
        </View>

        <TouchableOpacity style={styles.tab} onPress={() => {}}>
          <Text style={styles.tabBoldText}>Girl's Day Out</Text>
          <Text style={styles.tabText}>1 June, 12.30pm</Text>
          <Text style={styles.tabText}>Beach at Sentosa</Text>
        </TouchableOpacity>

        <Text style={styles.eventInfo}>@kate</Text>

        <TouchableOpacity style={styles.tab} onPress={() => {}}>
          <Text style={styles.tabBoldText}>ROLL OUT</Text>
          <Text style={styles.tabText}>6 June, 10.30am</Text>
          <Text style={styles.tabText}>Bowling at Kallang</Text>
        </TouchableOpacity>

        <Text style={styles.eventInfo}>@jane</Text>

        <View style={styles.headerStyle}>
          <Text style={styles.subHeaderText}>Invitations</Text>
        </View>

        <TouchableOpacity style={styles.tab} onPress={() => {}}>
          <Text style={styles.tabBoldText}>TGIF</Text>
          <Text style={styles.tabText}>9 June, 6.30pm</Text>
          <Text style={styles.tabText}>Movie at Serangoon NEX</Text>
        </TouchableOpacity>

        <View style={styles.invInfo}>
          <Text>Time remaining: 10 hours</Text>
          <Text>@jim</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5AA397',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
  },

  scrollContainer: {
    width: '100%',
    alignItems: 'center',
  },

  logoutButton: {
    alignSelf: 'flex-end',
    height: 30,
    marginTop: 20,
    marginRight: 10,
  },

  logoutText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 20,
    textDecorationLine: 'underline',
  },

  headerStyle: {
    alignSelf: 'flex-start',
    marginHorizontal: 35,
  },

  headerText: {
    fontSize: 50,
    color: '#F8F5F1',
    fontFamily: 'Montserrat_700Bold',
  },

  subHeaderText: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Montserrat_700Bold',
    paddingTop: 40,
  },

  tab: {
    backgroundColor: '#F8F5F1',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 350,
    marginTop: 15,
    borderRadius: 20,
  },

  tabBoldText: {
    fontFamily: 'Roboto_900Black',
  },

  tabText: {
    fontFamily: 'Roboto_400Regular',
  },

  eventInfo: {
    alignSelf: 'flex-end',
    paddingRight: 35,
  },

  invInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 35,
  },
});
