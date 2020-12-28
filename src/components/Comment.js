import React from 'react';

export default function Comment({ thisComment }) {
  const nestedComments = (thisComment.children || []).map((comment) => (
    <Comment key={comment.id} thisComment={comment} />
  ));

  return (
    <div className="comment">
      <div className="commentHeader">
        u/
        {thisComment.user}
      </div>
      <div className="commentBody">{thisComment.content}</div>
      <div className="commentFooter">
        <div>
          {thisComment.votes}
          {'      '}
          upvotes
        </div>
        <div>reply</div>
        <div>report</div>
      </div>
      {nestedComments}
    </div>
  );
}
