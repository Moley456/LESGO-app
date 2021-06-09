import firebase from './firebase';

const auth = firebase.auth();
const db = firebase.database();

export const writeUserData = async (email) => {
  const id = getCurrentUserId();
  const username = getCurrentUserName();

  await db.ref('app/users/' + id).set({
    username: username,
    email: email,
  });

  await db.ref('app/usernames/' + username).set({
    id: id,
  });
};

export const checkUsername = async (username) => {
  return db.ref('app/usernames/' + username).get();
};

export const getEmail = (uid) => {
  return db.ref('app/users/' + uid).get();
};

export const signIn = async ({ email, password }, onSuccess, onError) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return onSuccess(user);
  } catch (error) {
    return onError(error);
  }
};

export const createAccount = async ({ username, email, password }, onSuccess, onError) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    if (user) {
      await user.updateProfile({ displayName: username });
      await user.sendEmailVerification();
      return onSuccess(user);
    }
  } catch (error) {
    return onError(error);
  }
};

export const signOut = async (onSuccess, onError) => {
  try {
    await auth.signOut();
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
};

export const resetPassword = async ({ email }, onSuccess, onError) => {
  try {
    await auth.sendPasswordResetEmail(email);
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
};

export const getCurrentUserId = () => (auth.currentUser ? auth.currentUser.uid : null);

export const getCurrentUserName = () => (auth.currentUser ? auth.currentUser.displayName : null);

export const setOnAuthStateChanged = (onUserAuthenticated, onUserNotFound) =>
  auth.onAuthStateChanged((user) => {
    if (user) {
      return onUserAuthenticated(user);
    } else {
      return onUserNotFound(user);
    }
  });
