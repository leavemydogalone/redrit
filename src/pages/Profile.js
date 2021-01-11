import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/Auth';

export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

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
            account created on{' '}
            {currentUser.metadata.creationTime.toString().slice(0, 16)}
          </div>
          <div>
            last signed in on{' '}
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
          <div>post(#) : comments (#)</div>
          <div>post upcroaks : comment upcroaks</div>
        </div>
      </div>
    </div>
  );
}
