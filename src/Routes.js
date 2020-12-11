import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './pages/App';
import Profile from './pages/Profile';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="./pages/App" component={App} />
        <Route path="./pages/Profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}
