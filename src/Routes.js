import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import App from './pages/App';
import Profile from './pages/Profile';
import Comments from './pages/Comments';
import PostForm from './pages/PostForm';

export default function Routes() {
  const [commentSection, setCommentSection] = useState('');
  const commentsLink = <Link to="/comments">Comments</Link>;

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
        <Route exact path="/postform" component={PostForm} />
        <Route exact path="/">
          <App
            commentsLink={commentsLink}
            setCommentSection={setCommentSection}
          />
        </Route>
        <Route exact path="/comments">
          <Comments commentSection={commentSection} />
        </Route>
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}
