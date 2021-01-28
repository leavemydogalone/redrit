import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/Auth';
import firebase from '../firebase';

export default function SignUpInOutButton({ handleLoginPopUp }) {
  const { currentUser } = useContext(AuthContext);

  const logOut = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    if (currentUser && document.querySelector('.loginPopUp'))
      handleLoginPopUp();
  }, [currentUser]);

  // keep track of if it is signed in and get rid of pop up if signed in
  const display = currentUser ? (
    <button type="button" onClick={logOut}>
      Sign out
    </button>
  ) : (
    <button type="button" onClick={handleLoginPopUp}>
      Sign up/Sign In
    </button>
  );
  return <div className="loginOutButtonDiv">{display}</div>;
}
