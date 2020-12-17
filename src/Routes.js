import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import App from './pages/App';
import Profile from './pages/Profile';
import Comments from './pages/Comments';
import PostForm from './pages/PostForm';

export default function Routes() {
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
          <App />
        </Route>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile">
          <Comments />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
