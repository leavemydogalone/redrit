import React, { useState, useEffect } from 'react';
import Post from './components/Post';
import firebase from './firebase';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection('posts');

  function getPosts() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        setPosts(items);
        setLoading(false);
      });
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App" data-testid="App">
      <div className="topBar">top bar y</div>
      <div className="feed">
        <Post />
      </div>
    </div>
  );
}

export default App;
