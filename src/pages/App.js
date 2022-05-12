import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Post from '../components/Post';
import { AuthContext } from '../auth/Auth';

import Spinner from '../components/Spinner';
import { getVotes, getPosts, getFeeds } from '../methods/firebaseMethods';

function App({ handleSuccessPopUp }) {
  const { currentUser } = useContext(AuthContext);
  const [feed, setFeed] = useState('all');
  const [feedsData, setFeedsData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postVotes, setPostVotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  // one time get of a list of different groups/feeds
  useEffect(() => {
    getFeeds(setFeedsData);
  }, []);

  // subscription to all post votes. Would probably be better as a one time
  // get so that they dont need to subscribe to all vote updates
  // but since the app will likely not recieve much traffic, having a user
  // be subscribed to all votes won't affect their performance too negatively
  useEffect(() => {
    getPosts(setLoading, setPosts, feed);
  }, [feed, currentUser, reload]);

  // subscription to post votes, see above for why its a subscription
  useEffect(() => {
    getVotes(setPostVotes, 'post');
    return () => {
      getVotes(setPostVotes, 'post');
    };
  }, []);

  // will create a drop down of the different feeds you can view
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
            handleSuccessPopUp={handleSuccessPopUp}
            postVotes={postVotes}
            post={post}
            key={post.id}
            setFeed={setFeed}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    </div>
  );
}

export default withRouter(App);
