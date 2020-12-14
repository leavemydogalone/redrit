import React from 'react';
import TopBanner from './TopBanner';
// import PostBody from './PostBody';
import BottomBanner from './BottomBanner';

export default function Post({ post }) {
  const postBody =
    post.contentType === 'text' ? (
      <div>{post.content}</div>
    ) : (
      <img alt="post.title" src={post.content} />
    );
  return (
    <div data-testid="Post" className="post">
      <TopBanner />
      <b>{post.title}</b>
      <br />
      {postBody}
      <BottomBanner />
    </div>
  );
}
