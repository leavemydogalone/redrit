import React, { useState, useEffect, useContext } from 'react';
import Post from '../components/Post';
import { AuthContext } from '../auth/Auth';

import Spinner from '../components/Spinner';
import { getUserVotes, getPosts, getFeeds } from '../methods/firebaseMethods';

function App({ commentsLink }) {
  const { currentUser } = useContext(AuthContext);
  const [feed, setFeed] = useState('all');
  const [feedsData, setFeedsData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userPostVotes, setUserPostVotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // one time get of a list of different groups/feeds
  useEffect(() => {
    getFeeds(setFeedsData);
  }, []);

  useEffect(() => {
    getPosts(setLoading, setPosts, feed);
  }, [feed]);

  // subscription to current users upvotes for posts
  useEffect(() => {
    if (currentUser) getUserVotes(currentUser.uid, setUserPostVotes, 'post');
    return () => {
      getUserVotes(currentUser.uid, setUserPostVotes, 'post');
    };
  }, []);

  // function determineUpvote (post){
  //   if(userPostVotes[0]) {
  //     // for in loop?
  //     if (userPostVotes.includes(post.id))
  //   }
  // }
  const feedOptions = feedsData.map((group) => (
    <option value={group}>{group}</option>
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
            voted={7}
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
