import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import VoteArrow from './VoteArrow';
import { AuthContext } from '../auth/Auth';

// import TopBanner from './TopBanner';

export default function Post({ post, postVotes, setFeed }) {
  const [votes, setVotes] = useState([]);
  const [userVote, setUserVote] = useState();
  const { currentUser } = useContext(AuthContext);

  // finds and sets the votes for this particular post
  function determinePostVotes() {
    const thisPostVotes = postVotes.filter((x) => x.parentId === post.id);
    setVotes(thisPostVotes);
  }

  // determines if the current user has voted for the post and sets
  // the vote direction
  function determineUserVote() {
    if (currentUser) {
      const userVotedPost =
        votes[0] && votes.find((x) => x.uid === currentUser.uid);

      const setVote = userVotedPost
        ? setUserVote(userVotedPost)
        : setUserVote(false);
    }
  }

  // determines if the post votes change every time the postVotes subscription changes
  useEffect(() => {
    determinePostVotes();
  }, [postVotes]);

  useEffect(() => {
    determineUserVote();
  }, [votes]);

  const postBody =
    post.contentType === 'text' ? (
      post.content
    ) : (
      <img alt="post.title" src={post.content} />
    );

  return (
    <div data-testid="Post" className="post">
      <div className="topBanner" data-testid="TopBanner">
        <b>{post.group}</b>
        <div className="username">
          posted by u/{post.user} {post.createdAt.toDate().toDateString()}
        </div>
      </div>
      <b>{post.title}</b>
      <br />
      <div className="postBody" data-testid="PostBody">
        {postBody}
      </div>

      <div className="bottomBanner">
        <VoteArrow
          direction="up"
          userVote={userVote}
          parentId={post.id}
          type="post"
        />
        {/* this votes.length needs to be something else */}
        {votes.filter((x) => x.direction === 'up').length -
          votes.filter((x) => x.direction === 'down').length}
        <VoteArrow
          direction="down"
          userVote={userVote}
          parentId={post.id}
          type="post"
        />
        <Link to={`/comments/${post.id}`}>Comments</Link>
      </div>
    </div>
  );
}
