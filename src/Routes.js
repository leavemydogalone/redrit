import React, { useContext, useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { AuthProvider } from './auth/Auth';
import App from './pages/App';
import Profile from './pages/Profile';
import Comments from './pages/Comments';
import PostForm from './pages/PostForm';
import LoginOutButton from './components/LoginOutButton';
import Login from './auth/Login';

export default function Routes() {
  const [commentSection, setCommentSection] = useState(
    '9359d93d-a0be-4320-a4b0-5b7256d0babb'
  );
  // handles the sign in pop up
  const [popUp, setPopUp] = useState([]);
  const handlePopUp = () => {
    if (!popUp[0]) {
      setPopUp([<Login />]);
    } else {
      setPopUp([]);
    }
  };

  const commentsLink = (postId) => (
    <Link to="/comments" onClick={() => setCommentSection(postId)}>
      Comments
    </Link>
  );

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="topBar">
          <ul>
            <li>
              <Link to="/">All</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/postform">Make a post!</Link>
            </li>
            <li>
              <LoginOutButton handlePopUp={handlePopUp} />
            </li>
          </ul>
        </div>
        {popUp.map((thing) => thing)}

        <Switch>
          <Route exact path="/comments">
            <Comments commentSection={commentSection} />
          </Route>
          <Route exact path="/postform" component={PostForm} />
          <Route exact path="/">
            <App
              setCommentSection={setCommentSection}
              commentsLink={commentsLink}
            />
          </Route>
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}
