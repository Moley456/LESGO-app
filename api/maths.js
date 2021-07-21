import firebase from './firebase';
const db = firebase.database();

// return promise of value
export const calcBudget = async (roomUID) => {
  var value = 0;
  var count = 0;

  await db
    .ref('app/rooms/' + roomUID + '/preferences/budget')
    .orderByKey()
    .get()
    .then((snapshot) => {
      snapshot.forEach((data) => {
        count++;
        value += data.val();
      });
    });

  if (count === 0) {
    return 0;
  } else {
    return value / count;
  }
};

// return promise of array
export const generateActivities = async (roomUID) => {
  const activityCount = {};
  const sortingArray = [];
  const activities = [];

  await db
    .ref('app/rooms/' + roomUID + '/preferences/activities/')
    .get()
    .then((snapshot1) => {
      //loop through each participant
      snapshot1.forEach((participants) => {
        //loop through each preference of the participant
        participants.forEach((prefs) => {
          if (prefs.key in activityCount) {
            activityCount[prefs.key] += 1; //increase count if already appeared before
          } else {
            activityCount[prefs.key] = 1; //add new key-value pair if never appeared before
          }
        });
      });
      // convert activityCount object into 2D array
      for (const pref in activityCount) {
        sortingArray.push([pref, activityCount[pref]]);
      }

      //sort the 2D array
      var sortedArray = sortingArray.sort((a, b) => {
        return b[1] - a[1];
      });

      console.log(sortedArray);
      //push top 3 activities to activity array
      for (let i = 0; i < 3 && i < sortingArray.length; i++) {
        console.log(sortingArray.length + ' sorting array length');
        activities.push(sortingArray[i][0]);
      }
    });
  return activities;
};

export const getCurrentTime = () => {
  const time = new Date(new Date().getTime());
  return time;
};

export const getTimeAfter = (limit) => {
  const time = new Date(new Date().getTime() + limit * 60 * 60 * 1000);
  return time;
};

export const getTimeLeft = (endTime) => {
  const diff = (endTime - new Date().getTime()) / 1000 / 60 / 60;
  return diff;
};
