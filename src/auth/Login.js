import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { checkDisplayName } from '../methods/firebaseMethods';

export default function Login({ setPopUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [userNameValidity, setUserNameValidity] = useState(false);

  const resetInput = () => {
    setEmail('');
    setPassword('');
  };

  const newUser = (uid) => ({
    displayName,
    uid,
    commentPoints: 0,
    postPoints: 0,
    comments: 0,
    posts: 0,
    subscribedFeeds: [],
  });

  useEffect(() => {
    setUserNameValidity(false);
    checkDisplayName(displayName, setUserNameValidity);
  }, [displayName]);

  const userRef = firebase.firestore().collection('users');
  const register = async () => {
    if (!userNameValidity) return;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.updateProfile({
        displayName,
        photoUrl:
          'https://pyxis.nymag.com/v1/imgs/e6c/02c/cbe672af6609198720b69efd475ab5f641-avatar-last-airbender.rsquare.w1200.jpg',
      });
      await userRef
        .doc(firebase.auth().currentUser.uid)
        .set(newUser(firebase.auth().currentUser.uid))
        .catch((err) => {
          alert('Please make sure all fields are filled out');
        });
    } catch (err) {
      console.log(err);
    }
    resetInput();
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
    <div className="popUp">
      <div className="xButton">
        <button type="button" onClick={() => setPopUp([])}>
          X
        </button>
      </div>
      <h3>Login/Register</h3>
      <input
        id="displayNameField"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="user name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        required
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
