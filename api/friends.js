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

export const sendFriendRequest = (friendUserName) => {
  db.ref('app/usernames/' + friendUserName)
    .get()
    .then((snapshot) => {
      const friendUid = JSON.stringify(snapshot).slice(1, -1);
      db.ref('app/users/friends/' + friendUid).update({
        [getCurrentUserId()]: false,
      });
    });
};

export const rejectRequest = (friendUserName) => {
  return db
    .ref('app/usernames/' + friendUserName)
    .get()
    .then((snapshot) => {
      const friendUid = JSON.stringify(snapshot).slice(1, -1);
      db.ref('app/users/friends/' + getCurrentUserId() + '/' + friendUid).remove();
    });
};

export const acceptRequest = (friendUserName) => {
  return db
    .ref('app/usernames/' + friendUserName)
    .get()
    .then((snapshot) => {
      const friendUid = JSON.stringify(snapshot).slice(1, -1);
      db.ref('app/users/friends/' + getCurrentUserId()).update({ [friendUid]: true });
      db.ref('app/users/friends/' + friendUid).update({ [getCurrentUserId()]: true });
    });
};
