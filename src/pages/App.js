import React, { useState, useEffect, useContext } from 'react';
import Post from '../components/Post';
import { AuthContext } from '../auth/Auth';

import Spinner from '../components/Spinner';
import { getUserVotes, getPosts, getFeeds } from '../methods/firebaseMethods';

function App() {
  const { currentUser } = useContext(AuthContext);
  const [feed, setFeed] = useState('all');
  const [feedsData, setFeedsData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userPostVotes, setUserPostVotes] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(0);

  // one time get of a list of different groups/feeds
  useEffect(() => {
    getFeeds(setFeedsData);
  }, []);

  useEffect(() => {
    getPosts(setLoading, setPosts, feed);
  }, [feed, currentUser]);

  // subscription to current users upvotes for posts
  useEffect(() => {
    if (currentUser) getUserVotes(currentUser.uid, setUserPostVotes, 'post');
    console.log(userPostVotes);
    return () => {
      getUserVotes(currentUser.uid, setUserPostVotes, 'post');
    };
  }, []);

  const feedOptions = feedsData.map((group) => (
    <option value={group} key={group}>
      {group}
    </option>
  ));

  if (loading) {
    return <Spinner />;
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
            userPostVotes={userPostVotes}
            post={post}
            key={post.title}
            setFeed={setFeed}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
