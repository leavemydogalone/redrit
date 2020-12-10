import React from 'react';
import TopBanner from './TopBanner';
import PostBody from './PostBody';
import BottomBanner from './BottomBanner';
// import '../index.css';

export default function Post() {
  return (
    <div data-testid="Post" className="post">
      <TopBanner />
      <PostBody />
      <BottomBanner />
    </div>
  );
}
