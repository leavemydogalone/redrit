import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { AuthProvider } from './auth/Auth';
import App from './pages/App';
import Profile from './pages/Profile';
import Comments from './pages/Comments';
import PostForm from './pages/PostForm';
import LoginOutButton from './components/LoginOutButton';
import Login from './auth/Login';
import SuccessPopUp from './components/SuccessPopUp';
import { getBackground } from './methods/firebaseMethods';

export default function Routes() {
  // should probably have the sign out button return user to default home page
  // cuz otherwise they may be on the profile page or someones followed list
  const [backgroundUrl, setBackgroundUrl] = useState();
  const [popUp, setPopUp] = useState([]);

  useEffect(() => {
    getBackground(setBackgroundUrl);
  }, []);

  useEffect(() => {
    document.querySelector('#root').style.background = `url(${backgroundUrl})`;
  }, [backgroundUrl]);

  const handleLoginPopUp = () => {
    if (!popUp[0]) {
      setPopUp([<Login setPopUp={setPopUp} />]);
    } else {
      setPopUp([]);
    }
  };

  const handleSuccessPopUp = (text) => {
    setPopUp([<SuccessPopUp text={text} />]);
    console.log(text);
    const popUpTimeOut = setTimeout(() => setPopUp([]), 2000);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="topBar">
          <ul>
            <li>
              <Link to="/">Feeds</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/postform">Make a post!</Link>
            </li>
            <li>
              <LoginOutButton handleLoginPopUp={handleLoginPopUp} />
            </li>
          </ul>
        </div>
        {popUp.map((thing) => thing)}

        <Switch>
          <Route path="/comments/:id">
            <Comments handleSuccessPopUp={handleSuccessPopUp} />;
          </Route>

          <Route exact path="/postform">
            <PostForm handleSuccessPopUp={handleSuccessPopUp} />
          </Route>
          <Route exact path="/" component={App} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}
