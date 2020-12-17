import React from 'react';
import TopBanner from './TopBanner';
// import PostBody from './PostBody';
import BottomBanner from './BottomBanner';

export default function Post({ post }) {
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
      <BottomBanner post={post} />
    </div>
  );
}
