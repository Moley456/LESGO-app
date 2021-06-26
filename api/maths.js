import { getCurrentUserId } from './auth';
import firebase from './firebase';

const db = firebase.database();


export const calcBudget = async (roomUID) => {
    var value = 0;
    var count = 0;

    await db
      .ref('app/rooms/' + roomUID + "/preferences/budget")
      .orderByKey()
      .get()
      .then((snapshot) => {
        snapshot.forEach((data) => {
            count += data.val();
            value += data.key * data.val();
        })
      })
    
    if (count === 0) {
        return 0;
    } else {
        return value/count;
    }
}

export const generateActivity = async (roomUID) => {
    var activities = [];

    await db
    .ref('app/rooms/' + roomUID + "/preferences/")
    .orderByValue()
    .on('value', (snapshot) => {
        snapshot.forEach((data) => {
            if (!Array.isArray(data.val())) {
                activities.push(data.key)
            }
        })
    })

    return activities;
}

export const getCurrentTime = () => {
    const time = new Date(new Date().getTime());
    return time;
}

export const getTimeAfter = (limit) => {
    const time = new Date(new Date().getTime()+( (limit) *60*60*1000));
    return time;
}

export const getTimeLeft = (endTime) => {
    const diff = (endTime - getCurrentTime())/1000/60/60;
    return diff;
}