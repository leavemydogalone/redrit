import React from 'react';
import TopBanner from './TopBanner';
import PostBody from './PostBody';
import BottomBanner from './BottomBanner';

export default function Post() {
  return (
    <div data-testid="Post">
      <TopBanner />
      <PostBody />
      <BottomBanner />
    </div>
  );
}
