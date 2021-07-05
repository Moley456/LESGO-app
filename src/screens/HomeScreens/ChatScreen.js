import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import { SafeAreaView, StyleSheet, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import HideKeyboard from '../../components/HideKeyboard';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import * as Auth from "../../../api/auth";


const db = firebase.database();

export default ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);
    const roomId = route.params.params.key;

    const logData = (newMessage) => {
        const timeInString = newMessage[0].createdAt.toString();
        newMessage[0].createdAt = timeInString;
        db.ref("app/chats/" + roomId).update({
            [newMessage[0]._id]: newMessage[0]
        })

    }

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

    useEffect(() => {
        setMessages([])
        db.ref('app/chats/' + roomId).once('value', (snapshot) => {
            snapshot.forEach((data) => {
                 setMessages((messages) => [...messages, {...data.val(), key: data.val()._id}])
            })
        })
    }, [])

    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      logData(messages)
    }, [])
    
    
  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} />
        </TouchableOpacity>
        <Text style={styles.header}>Chat</Text>

        <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: Auth.getCurrentUserName(),
      }}
    />

      </SafeAreaView>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5AA397',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
    paddingBottom: 70,
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
    marginLeft: '10%'
  },

  subHeader: {
    fontSize: 25,
    fontFamily: 'Montserrat_700Bold',
    marginVertical: 10,
    textAlign: 'center',
  },


});
