import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import Spinner from '../components/Spinner';

export const AuthContext = React.createContext();

// should rename to make it more generic and have the name work with votes as well
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
