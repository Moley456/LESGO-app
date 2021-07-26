import { GOOGLE_API_KEY } from '@env';
import firebase from 'firebase';
import { generateActivities } from './maths';
const db = firebase.database();

export const fetchPlaces = async (activity) => {
  let keyword = '';
  const finalResults = [];
  switch (activity) {
    case 'Badminton':
      keyword = 'badminton complex sports complex singapore';
      break;
    case 'Golf':
      keyword = 'golf courses singapore';
      break;
    case 'Bowling':
      keyword = 'singapore bowling';
      break;
    case 'Prawning':
      keyword = 'prawning singapore';
      break;
    case 'Karaoke':
      keyword = 'karaoke singapore';
      break;
    case 'Paint':
      keyword = 'places to paint singapore';
      break;
    case 'Board Games':
      keyword = 'board games singapore';
      break;
    case 'Climbing':
      keyword = 'rock climbing gym singapore';
      break;
    case 'Theme Parks':
      keyword = 'theme parks singapore';
      break;
    case 'Nature':
      keyword = 'nature reserve singapore';
      break;
  }
  const latitude = 1.3521;
  const longitude = 103.8198;
  const url =
    'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
    latitude +
    ',' +
    longitude +
    '&radius=10000&keyword=' +
    keyword +
    '&key=' +
    GOOGLE_API_KEY;

  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const places = res.results;
      const results = [];
      const compareFunction = (a, b) => {
        if (a.rating >= b.rating) {
          return -1;
        } else {
          return 1;
        }
      };

      places.forEach((element) => {
        if (element.user_ratings_total > 50) {
          results.push(element.place_id);
        }
      });
      results.sort(compareFunction);

      for (let i = 0; i < 2; i++) {
        finalResults.push(results[i]);
      }
    })
    .catch((error) => console.log(error));

  return finalResults;
};

export const addplaceID = (roomUID, activityInfo) => {
  db.ref('app/rooms/' + roomUID + '/details').update({
    placeID: activityInfo[0],
  });
};

export const getPlaceInfo = (placeID, setName, setLocation, setPhoto) => {
  const url =
    'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeID + '&fields=name,formatted_address,photos&key=' + GOOGLE_API_KEY;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const details = res.result;
      setName(details.name);
      setLocation(details.formatted_address);
      setPhoto(details.photos[0].photo_reference);
    });
};

export const getPlaceName = async (placeID) => {
  const url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeID + '&fields=name&key=' + GOOGLE_API_KEY;
  let final = {};
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const details = res.result;
      final = details;
    });
  return final;
};

export const getPlacePhoto = (photoRef) => {
  const url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photoRef + '&key=' + GOOGLE_API_KEY;
  return url;
};
