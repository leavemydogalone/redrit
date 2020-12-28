import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';

export default function Comment({ thisComment, set }) {
  const [childCommentText, setChildCommentText] = useState(
    'Reply to comment...'
  );
  const [formPopUp, setFormPopUp] = useState();

  function handleSubmit() {
    return true;
  }

  const childCommentForm = (
    <div>
      <textarea
        value={childCommentText}
        onFocus={(e) => {
          if (e.target.value === 'Reply to comment...') {
            setChildCommentText('');
          }
        }}
        onChange={(e) => setChildCommentText(e.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          handleSubmit({
            content: childCommentText,
            id: uuidv4(),
            user: 'im a user',
            votes: 1,
            timeStamp: firebase.firestore.Timestamp.now(),
          })
        }
      >
        Submit!
      </button>
    </div>
  );

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
          upvotes
        </div>
        <div
          role="button"
          tabIndex="0"
          onKeyDown={() => setFormPopUp(childCommentForm)}
          onClick={() => setFormPopUp(childCommentForm)}
        >
          reply
        </div>
        <div>report</div>
        <div>{formPopUp}</div>
      </div>
      {nestedComments}
    </div>
  );
}
