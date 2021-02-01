import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VoteArrow from './VoteArrow';
// import TopBanner from './TopBanner';

export default function Post({ post, userPostVotes, setFeed }) {
  const [vote, setVote] = useState(false);

  // will try to find the 'vote' object in the user's votes collection
  // and if it exists, will set the direction of the vote accordingly
  // otherwise will set it to false (this is to remove the vote direction if
  // it was previously set)
  function determineVote() {
    const votedPost = userPostVotes.find((x) => x.id === post.id);
    const setDirection = votedPost
      ? setVote(votedPost.direction)
      : setVote(false);
  }

  // will determine if the post has been voted on everytime the user's upVotes
  //  collection changes
  useEffect(() => {
    determineVote();
  }, [userPostVotes]);

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
          u/
          {post.user}
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
          voted={vote === 'up'}
          id={post.id}
          type="post"
        />
        {post.votes}
        <VoteArrow
          direction="down"
          voted={vote === 'down'}
          id={post.id}
          type="post"
        />
        <Link to={`/comments/${post.id}`}>Comments</Link>
      </div>
    </div>
  );
}
