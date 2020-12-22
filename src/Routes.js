import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import App from './pages/App';
import Profile from './pages/Profile';
import Comments from './pages/Comments';
import PostForm from './pages/PostForm';

export default function Routes() {
  const [commentSection, setCommentSection] = useState(
    '9359d93d-a0be-4320-a4b0-5b7256d0babb'
  );

  const commentsLink = (postId) => (
    <Link to="/comments" onClick={() => setCommentSection(postId)}>
      Comments
    </Link>
  );

  return (
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
        </ul>
      </div>
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
  );
}
