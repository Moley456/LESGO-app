import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import BottomBar from '../components/BottomBar';
import * as Authentication from '../../api/auth';

export default ({ navigation }) => {
  const handleLogout = () => {
    Authentication.signOut(
      () =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        ),
      console.error
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.header}>
            Welcome,{'\n'}
            {Authentication.getCurrentUserName()}!
          </Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subHeader}>Upcoming Events</Text>

        <View>
          <TouchableOpacity style={styles.tab} onPress={() => {}}>
            <Text style={{ fontWeight: 'bold' }}>Girl's Day Out</Text>
            <Text>1 June, 12.30pm</Text>
            <Text>Beach at Sentosa</Text>
          </TouchableOpacity>
          <Text style={styles.info}>@kate</Text>

          <TouchableOpacity style={styles.tab} onPress={() => {}}>
            <Text style={{ fontWeight: 'bold' }}>ROLL OUT</Text>
            <Text>6 June, 10.30am</Text>
            <Text>Bowling at Kallang</Text>
          </TouchableOpacity>
          <Text style={styles.info}>@jane</Text>
        </View>

        <Text style={styles.subHeader}>Invitations</Text>

        <TouchableOpacity style={styles.tab} onPress={() => {}}>
          <Text style={{ fontWeight: 'bold' }}>TGIF</Text>
          <Text>9 June, 6.30pm</Text>
          <Text>Movie at Serangoon NEX</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ alignSelf: 'flex-start', paddingLeft: 20 }}>Time remaining: 10 hours</Text>
          <Text style={styles.info}>@jim</Text>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <BottomBar />
      </View>
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
    paddingBottom: 60,
  },

  header: {
    fontSize: 50,
    color: '#F8F5F1',
    fontFamily: 'Montserrat_700Bold',
    paddingTop: 50,
    paddingLeft: 20,
  },

  logoutButton: { backgroundColor: '#5AA897', height: 30, marginLeft: 20, marginTop: 15 },

  logoutText: { fontFamily: 'Montserrat_700Bold', fontSize: 20 },

  subHeader: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Montserrat_700Bold',
    paddingLeft: 20,
    paddingTop: 40,
  },

  tab: {
    backgroundColor: '#F8F5F1',
    fontFamily: 'Roboto_900Black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 350,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 20,
  },

  info: {
    alignSelf: 'flex-end',
    paddingRight: 20,
  },
});
