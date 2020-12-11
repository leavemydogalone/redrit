import React from 'react';
import TopBanner from './TopBanner';
import PostBody from './PostBody';
import BottomBanner from './BottomBanner';

export default function Post({ post }) {
  return (
    <div data-testid="Post" className="post">
      <TopBanner />
      {/* <PostBody /> */}
      {post.title}
      {post.content}
      <BottomBanner />
    </div>
  );
}
