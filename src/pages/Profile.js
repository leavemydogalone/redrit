import React, { useContext, useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { AuthContext } from '../auth/Auth';
import firebase from '../firebase';
import Spinner from '../components/Spinner';
import UpdatePopUp from '../components/UpdatePopUp';

function Profile({ setPopUp }) {
  const [userData, setUserData] = useState({});

  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  // a single get of post data
  function getUserData() {
    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid);

    userRef.get().then((doc) => {
      setUserData(doc.data());
      setLoading(false);
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

  if (loading) return <Spinner />;

  const updateWordArray = ['displayName', 'password', 'email', 'photoURL'];
  const updateButtons = updateWordArray.map((thing) => (
    <button
      type="button"
      className="updateButton"
      onClick={() =>
        setPopUp([<UpdatePopUp setPopUp={setPopUp} type={thing} />])
      }
    >
      {thing}
    </button>
  ));

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
          {updateButtons}
        </div>
        <div className="profileBar" id="profilePostsAndComments">
          <div>
            Posts ({userData.posts}) : Comments ({userData.comments})
            {/* <Link exa>Posts</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Profile);
