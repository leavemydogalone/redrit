import React from 'react';

export default function Comment({ thisComment }) {
  const nestedComments = (thisComment.children || []).map((comment) => (
    <Comment key={comment.id} thisComment={comment} />
  ));

  return (
    <div className="comment">
      <div className="commentHeader">Im the comment header</div>
      <div className="commentBody">{thisComment.content}</div>
      <div className="commentFooter">Votes, report, edit</div>
      {nestedComments}
    </div>
  );
}
