import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyCWQSUVn3zb_D3X2hKWZmjlIcEzFYjUYW8',
  authDomain: 'redrit-75871.firebaseapp.com',
  projectId: 'redrit-75871',
  storageBucket: 'redrit-75871.appspot.com',
  messagingSenderId: '439515708143',
  appId: '1:439515708143:web:8d2173cad9d3504e85391a',
  measurementId: 'G-BHLNZNRTVE',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
