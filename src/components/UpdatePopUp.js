import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllUsersData } from '../methods/firebaseMethods';
import firebase from '../firebase';
import { AuthContext } from '../auth/Auth';
import checkItemValidity from '../methods/validationMethods';

export default function updatePopUp({ setPopUp, type }) {
  const [usersData, setUsersData] = useState([]);
  const [itemValidity, setItemValidity] = useState(true);
  const [itemToBeUpdated, setItemToBeUpdated] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { currentUser } = useContext(AuthContext);
  const usersRef = firebase.firestore().collection('users');

  useEffect(() => {
    if (type === 'displayName') {
      getAllUsersData(setUsersData);
    }
    return () => {
      if (type === 'displayName') {
        getAllUsersData(setUsersData);
      }
    };
  }, []);

  useEffect(() => {
    if (itemToBeUpdated.length > 0)
      checkItemValidity(
        usersData,
        itemToBeUpdated,
        setItemValidity,
        setErrorMessage,
        type
      );
  }, [itemToBeUpdated]);

  const updateItem = async (e) => {
    if (itemToBeUpdated === '') {
      return;
    }
    // maybe just get rid of updating username because then will need to change
    // all votes and posts and comments they have done. Atleast for displayName prop
    function setUserDisplayName() {
      if (type === 'displayName') {
        return {
          displayName: itemToBeUpdated,
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        };
      }
      return {
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
      };
    }

    if (itemValidity) {
      try {
        await usersRef.doc(currentUser.uid).update(setUserDisplayName());
        await firebase.auth().currentUser.updateProfile({
          type: itemToBeUpdated,
        });

        setErrorMessage('Updated Successfully');
        const closePopUp = setTimeout(() => {
          setPopUp([]);
        }, 2000);
      } catch (err) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <div className="popUp">
      <button type="button" className="xButton" onClick={() => setPopUp([])}>
        X
      </button>
      {type}
      <input
        type="text"
        value={itemToBeUpdated}
        onChange={(e) => setItemToBeUpdated(e.target.value)}
        className={itemValidity ? 'valid' : 'inValid'}
        required
        minLength="3"
      />
      <div>
        <button type="button" onClick={() => updateItem()}>
          Submit
        </button>
      </div>
      <div>{errorMessage}</div>
    </div>
  );
}
