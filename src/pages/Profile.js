import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/Auth';
import firebase from '../firebase';

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  const userRef = firebase.firestore().collection('users').doc(currentUser.uid);

  // a single get of post data
  function getUserData() {
    userRef.get().then((doc) => {
      setUserData(doc.data());
      setLoading(false);
      console.log(doc.data());
    });
  }

  useEffect(() => {
    if (currentUser) getUserData();
  }, []);

  if (!currentUser)
    return (
      <div className="profilePage">
        <div className="profilePageContainer">
          <div className="profileMain">
            <h3>Please register or log in to view profile info</h3>
          </div>
        </div>
      </div>
    );

  if (loading) return <h1>loading</h1>;
  return (
    <div className="profilePage">
      <div className="profilePageContainer">
        <div className="profileMain">
          <img
            src="https://pyxis.nymag.com/v1/imgs/e6c/02c/cbe672af6609198720b69efd475ab5f641-avatar-last-airbender.rsquare.w1200.jpg"
            alt="Avatar"
          />
          <div>u/{currentUser.displayName}</div>
          <div>
            Account created on{' '}
            {currentUser.metadata.creationTime.toString().slice(0, 16)}
          </div>
          <div>
            Last signed in on{' '}
            {currentUser.metadata.lastSignInTime.toString().slice(0, 16)}
          </div>
        </div>
        <div className="profileBar" id="profileUpdate">
          <div>Update:</div>
          <div>username</div>
          <div>password</div>
          <div>email</div>
        </div>
        <div className="profileBar" id="profilePostsAndComments">
          <div>
            Posts ({userData.posts}) : Comments ({userData.comments})
          </div>
          <div>post upcroaks : comment upcroaks</div>
        </div>
      </div>
    </div>
  );
}
