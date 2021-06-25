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

export const getActivity = async (roomUID) => {
    var activities = [];

    await db
    .ref('app/rooms/' + roomUID + "/preferences/")
    .orderByValue()
    .limitToLast(4)
    .on('value', (snapshot) => {
        snapshot.forEach((data) => {
            if (!Array.isArray(data.val())) {
                activities.push(data.key)
                console.log(activities);
            }
        })
    })

}