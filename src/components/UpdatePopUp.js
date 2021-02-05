import React, { useState, useEffect } from 'react';

import { getAllUsersData } from '../methods/firebaseMethods';
import { checkImgURL, checkItemValidity } from '../methods/validationMethods';

export default function updatePopUp({ setPopUp, type }) {
  const [usersData, setUsersData] = useState([]);
  const [itemValidity, setItemValidity] = useState(false);
  const [itemToBeUpdated, setItemToBeUpdated] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    checkItemValidity(
      usersData,
      itemToBeUpdated,
      setItemValidity,
      setErrorMessage,
      type
    );
  }, [itemToBeUpdated]);

  return (
    <div className="popUp">
      <button type="button" onClick={() => setPopUp([])}>
        X
      </button>
      {type}
      <input
        type="text"
        value={itemToBeUpdated}
        onChange={(e) => setItemToBeUpdated(e.target.value)}
        className={itemValidity ? 'valid' : 'inValid'}
      />
    </div>
  );
}
