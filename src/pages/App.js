import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import firebase from '../firebase';

function App({ commentsLink }) {
  const [feed, setFeed] = useState('all');
  const [feedsData, setFeedsData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const postsRef = firebase.firestore().collection('posts');
  const groupsRef = firebase.firestore().collection('groups');

  function allOrOneFeed() {
    if (feed === 'all') return postsRef;
    return postsRef.where('group', '==', feed);
  }

  function getPosts() {
    setLoading(true);
    allOrOneFeed()
      .get()
      .then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setPosts(items);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function getFeeds() {
    groupsRef.get().then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data().title);
      });
      setFeedsData(items);
    });
  }

  useEffect(() => {
    getFeeds();
  }, []);

  useEffect(() => {
    getPosts();
  }, [feed]);

  const feedOptions = feedsData.map((group) => (
    <option value={group}>{group}</option>
  ));

  if (loading) {
    return <h1 data-testid="App">One second, must load posts</h1>;
  }

  return (
    <div className="App" data-testid="App">
      <div className="feedSelectorBar">
        <label htmlFor="feedSelector">
          Feed:
          <select
            name="feedSelector"
            value={feed}
            onChange={(e) => setFeed(e.target.value)}
          >
            <option value="all">All</option>
            {feedOptions}
          </select>
        </label>
      </div>
      <div className="feed">
        {posts.map((post) => (
          <Post
            post={post}
            key={post.title}
            setFeed={setFeed}
            commentsLink={commentsLink}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
