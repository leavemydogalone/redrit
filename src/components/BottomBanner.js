import React from 'react';

export default function BottomBanner({ post }) {
  return (
    <div data-testid="BottomBanner" className="bottomBanner">
      <div className="postComments" data-testid="PostComments">
        Comments
      </div>
    </div>
  );
}
