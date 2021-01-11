import React, { useState } from 'react';
import firebase from '../firebase';

export default function Login({ setPopUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const resetInput = () => {
    setEmail('');
    setPassword('');
  };

  const newUser = {
    userName,
    votes: 0,
    commentPoints: 0,
    postPoints: 0,
    comments: [],
    posts: [],
    subscribedFeeds: [],
  };

  const ref = firebase.firestore().collection('users');

  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // updates the username on firebase
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: userName,
            photoUrl:
              'https://pyxis.nymag.com/v1/imgs/e6c/02c/cbe672af6609198720b69efd475ab5f641-avatar-last-airbender.rsquare.w1200.jpg',
          })
          .then(() => {
            console.log('username created successfully');
            // creates a new document in the users collection
            ref
              .doc(firebase.auth().currentUser.uid)
              .set(newUser)
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((error) => {
            console.log(error);
          });
        resetInput();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resetInput();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="loginPopUp">
      <div className="xButton">
        <button type="button" onClick={() => setPopUp([])}>
          X
        </button>
      </div>
      <h3>Login/Register</h3>
      <input
        type="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <div id="popUpButtonRow">
        <button type="button" onClick={register}>
          Register
        </button>
        <button type="button" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
