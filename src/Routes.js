import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import App from './pages/App';
import Profile from './pages/Profile';
import Comments from './pages/Comments';

export default function Routes() {
  const [post, setPost] = useState('');

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
        </ul>
      </div>
      <Switch>
        <Route exact path="/">
          <App setPost={setPost} />
        </Route>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile">
          <Comments post={post} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
