import React, { useState } from 'react';
import firebase from '../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetInput = () => {
    setEmail('');
    setPassword('');
  };

  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        resetInput();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resetInput();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <div className="inputBox">
        <h3>Login/Register</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="button" onClick={register}>
          Register
        </button>
        <button type="button" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
