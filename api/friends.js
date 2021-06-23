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
    .ref('app/friends/' + getCurrentUserId())
    .orderByValue()
    .startAt(false)
    .once('value');

  return promise;
};

export const searchCurrent = async () => {
  const promise = db
    .ref('app/friends/' + getCurrentUserId())
    .orderByValue()
    .equals(true)
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
      db.ref('app/friends/' + friendUid).update({
        [getCurrentUserId()]: false,
      });
      db.ref('app/friends/' + getCurrentUserId()).update({
        [friendUid]: "-",
      });
    });
};

export const rejectRequest = (friendUserName) => {
  return db
    .ref('app/usernames/' + friendUserName)
    .get()
    .then((snapshot) => {
      const friendUid = JSON.stringify(snapshot).slice(1, -1);
      db.ref('app/friends/' + getCurrentUserId() + '/' + friendUid).remove();
      db.ref('app/friends/' + friendUid + '/' + getCurrentUserId()).remove();
    });
};

export const acceptRequest = (friendUserName) => {
  return db
    .ref('app/usernames/' + friendUserName)
    .get()
    .then((snapshot) => {
      const friendUid = JSON.stringify(snapshot).slice(1, -1);
      db.ref('app/friends/' + getCurrentUserId()).update({ [friendUid]: true });
      db.ref('app/friends/' + friendUid).update({ [getCurrentUserId()]: true });
    });
};

export const deleteFriend = (friendUserName) => {
  return db
    .ref('app/usernames/' + friendUserName)
    .get()
    .then((snapshot) => {
      const friendUid = JSON.stringify(snapshot).slice(1, -1);
      db.ref('app/friends/' + getCurrentUserId() + '/' + friendUid).remove();
      db.ref('app/friends/' + friendUid + '/' + getCurrentUserId()).remove();
    });
};
