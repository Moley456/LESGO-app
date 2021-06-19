import { getCurrentUserId } from './auth';
import firebase from './firebase';

const db = firebase.database();

export const searchAll = async (queryText) => {
  const searchPromise = await db
    .ref('app/users')
    .orderByChild('username')
    .startAt(queryText)
    .endAt(queryText + '\uf8ff')
    .once('value');

  return searchPromise;
};

export const searchPending = async () => {
  const promise = await db
    .ref('app/users/friends/' + getCurrentUserId())
    .orderByValue()
    .startAt(false)
    .once('value');

  return promise;
};

export const searchCurrent = async () => {
  const promise = db
    .ref('app/users/friends/' + getCurrentUserId())
    .orderByValue()
    .startAt(true)
    .endAt(true)
    .once('value');

  return promise;
};

export const getUserInfo = async (uid) => {
  const searchPromise = await db.ref('app/users/' + uid).get();
  return searchPromise;
};

export const sendFriendReq = (friendUserName) => {
  db.ref('app/usernames/' + friendUserName)
    .get()
    .then((snapshot) => {
      const friendUid = JSON.stringify(snapshot).slice(1, -1);
      db.ref('app/users/friends/' + getCurrentUserId()).update({
        [friendUid]: false,
      });
    });
};

export const sendCancelReq = (friendUserName) => {
  db.ref('app/usernames/' + friendUserName)
    .get()
    .then((snapshot) => {
      const friendUid = JSON.stringify(snapshot).slice(1, -1);
      db.ref('app/users/friends/' + getCurrentUserId() + '/' + friendUid)
        .remove()
        .then(() => console.log('pressed'));
    });
};
