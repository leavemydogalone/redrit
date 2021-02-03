import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { getDisplayNames } from '../methods/firebaseMethods';

export default function Login({ setPopUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [displayNameList, setDisplayNameList] = useState([]);
  const [displayNameValidity, setDisplayNameValidity] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    getDisplayNames(setDisplayNameList);
    return () => {
      getDisplayNames(setDisplayNameList);
    };
  }, []);

  function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }

  function checkDisplayNameValidity() {
    const alreadyUsedDisplayName = displayNameList.find(
      (x) => x.displayName === displayName
    );
    if (
      alreadyUsedDisplayName ||
      hasWhiteSpace(displayName) ||
      displayName === '' ||
      displayName === Number ||
      displayName === null ||
      displayName === undefined
    ) {
      setDisplayNameValidity(false);
      setErrorMessage('user name invalid');
    } else {
      setDisplayNameValidity(true);
      setErrorMessage('');
    }
  }

  useEffect(() => {
    checkDisplayNameValidity();
  }, [displayName]);

  const userRef = firebase.firestore().collection('users');
  const register = async () => {
    if (displayNameValidity) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firebase.auth().currentUser.updateProfile({
          displayName,
          photoUrl:
            'https://pyxis.nymag.com/v1/imgs/e6c/02c/cbe672af6609198720b69efd475ab5f641-avatar-last-airbender.rsquare.w1200.jpg',
        });
        await userRef
          .doc(firebase.auth().currentUser.uid)
          .set(newUser(firebase.auth().currentUser.uid));
        setPopUp([]);
      } catch (err) {
        setErrorMessage(err.message);
      }
    }
    resetInput();
  };

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resetInput();
        setPopUp([]);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const inValidStyle = { backgroundColor: ' red ' };

  return (
    <div className="popUp">
      <div className="xButton">
        <button type="button" onClick={() => setPopUp([])}>
          X
        </button>
      </div>
      <h3>Login/Register</h3>
      <div style={{ color: 'red' }}>{errorMessage}</div>
      <input
        style={displayNameValidity ? null : inValidStyle}
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
