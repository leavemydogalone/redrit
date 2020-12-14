import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import App from './pages/App';
import Profile from './pages/Profile';

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
        </ul>
      </div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}
