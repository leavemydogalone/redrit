import React, { useContext } from 'react';
import { AuthContext } from '../auth/Auth';
import firebase from '../firebase';

export default function SignUpInOutButton({ handlePopUp }) {
  const { currentUser } = useContext(AuthContext);

  const logOut = () => {
    firebase.auth().signOut();
  };

  const display = currentUser ? (
    <button type="button" onClick={logOut}>
      Sign out
    </button>
  ) : (
    <button type="button" onClick={handlePopUp}>
      Sign up/Sign In
    </button>
  );
  return <div>{display}</div>;
}
