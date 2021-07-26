import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, Day } from 'react-native-gifted-chat';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import HideKeyboard from '../../components/HideKeyboard';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import * as Auth from '../../../api/auth';

export default ({ navigation, route }) => {
  const db = firebase.database();
  const [messages, setMessages] = useState([]);
  const roomId = route.params.params.key;

  const logData = (newMessage) => {
    const timeInString = newMessage[0].createdAt.toString();
    newMessage[0].createdAt = timeInString;
    db.ref('app/chats/' + roomId).update({
      [messages.length + 1]: newMessage[0],
    });
  };

  useEffect(() => {
    setMessages([]);
    const sub = db.ref('app/chats/' + roomId).on('child_added', (snapshot, prevChildKey) => {
      setMessages((messages) => [{ ...snapshot.val(), key: snapshot.val()._id }, ...messages]);
    });

    return () => sub;
  }, []);

  /*    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, []) */

  /*     const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []) */

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={32} />
      </TouchableOpacity>
      <Text style={styles.header}>Chat</Text>
      <GiftedChat
        messages={messages}
        onSend={(messages) => {
          logData(messages);
        }}
        user={{
          _id: Auth.getCurrentUserId(),
          name: Auth.getCurrentUserName(),
          avatar: 'https://placeimg.com/140/140/any',
        }}
        renderUsernameOnMessage={true}
        showUserAvatar={true}
        onPressAvatar={(clickedUser) => {
          navigation.navigate('ViewUser', { ...clickedUser });
        }}
        textProps={{ style: { color: 'black' } }}
        timeTextStyle={{ left: { color: 'grey' }, right: { color: 'grey' } }}
        renderChatEmpty={() => {
          return (
            <View style={styles.emptyChat}>
              <Text style={styles.subHeader}>Start chatting!</Text>
            </View>
          );
        }}
        renderDay={(props) => {
          return <Day {...props} textStyle={{ color: 'black', fontFamily: 'Montserrat_700Bold' }} />;
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: '#b8d5cd',
                },
                right: {
                  backgroundColor: '#F8F5F1',
                },
              }}
              usernameStyle={{
                color: 'grey',
              }}
            />
          );
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-30} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5AA397',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
  },

  backButton: {
    position: 'absolute',
    alignSelf: 'flex-start',
    top: '7%',
    left: '3%',
  },

  header: {
    fontSize: 55,
    color: '#F8F5F1',
    fontFamily: 'Montserrat_700Bold',
    marginTop: 50,
    marginLeft: '10%',
  },

  subHeader: {
    fontSize: 20,
    fontFamily: 'Roboto_400Regular',
    paddingBottom: '10%',
  },

  emptyChat: {
    transform: [{ scaleY: -1 }],
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
