import React, { useState, useEffect, useContext } from 'react';
import firebase from '../firebase';
import { getAllUsersData } from '../methods/firebaseMethods';

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

  // it dont work
  const updateItem = async (e) => {
    // if (e.target.value.length === 0) return;

    console.log(itemValidity);
    console.log(currentUser.uid);
    console.log(usersRef.doc(currentUser.uid));
    console.log(itemToBeUpdated);
    if (itemValidity) {
      try {
        await usersRef.doc(currentUser.uid).update({
          displayName: itemToBeUpdated,
        });

        // await firebase.auth().currentUser.updateProfile({
        //   type: itemToBeUpdated,
        // });

        setErrorMessage('Updated Successfully');
      } catch (err) {
        setErrorMessage(err.message);
      }
    }
    // resetInput();
  };

  console.log(type);
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
        <button type="button" onClick={(e) => updateItem(e)}>
          Submit
        </button>
      </div>
      <div>{errorMessage}</div>
    </div>
  );
}
