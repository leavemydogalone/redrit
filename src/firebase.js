import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_MESSAGING_APP_ID,
  measurmentId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// var firebaseConfig = {
//   apiKey: 'AIzaSyCWQSUVn3zb_D3X2hKWZmjlIcEzFYjUYW8',
//   authDomain: 'redrit-75871.firebaseapp.com',
//   projectId: 'redrit-75871',
//   storageBucket: 'redrit-75871.appspot.com',
//   messagingSenderId: '439515708143',
//   appId: '1:439515708143:web:8d2173cad9d3504e85391a',
//   measurementId: 'G-BHLNZNRTVE',
// };

firebase.initializeApp(firebaseConfig);

export default firebase;
