import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import firebase from '../firebase';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection('posts');

  function getPosts() {
    setLoading(true);
    ref.get().then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPosts(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return <h1 data-testid="App">One second, must load posts</h1>;
  }

  return (
    <div className="App" data-testid="App">
      <div className="topBar">top bar</div>
      <div className="feed">
        {posts.map((post) => (
          <Post post={post} key={post.title} />
        ))}
      </div>
    </div>
  );
}

export default App;
