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
    'b5768112-a1a9-4dc0-a17b-d500d148f442'
  );
  // handles the sign in pop up
  // should probably have the sign out button return user to default home page
  // cuz otherwise they may be on the profile page or someones followed list
  const [popUp, setPopUp] = useState([]);
  const handlePopUp = () => {
    if (!popUp[0]) {
      setPopUp([<Login setPopUp={setPopUp} />]);
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
