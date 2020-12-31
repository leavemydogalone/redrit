import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';

export default function Comment({ thisComment, setSelected, selected }) {
  const [childCommentText, setChildCommentText] = useState(
    'Reply to comment...'
  );
  const [formPopUp, setFormPopUp] = useState([]);

  function handleSubmit() {
    return true;
  }

  const childCommentForm = (
    <div className="commentPopUp">
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
            children: [],
            timeStamp: firebase.firestore.Timestamp.now(),
          })
        }
      >
        Submit response!
      </button>
    </div>
  );

  async function handleFormPopUp() {
    await setSelected(false);
    if (formPopUp.length === 1) return;
    setSelected(true);
    setFormPopUp([childCommentForm]);
  }

  useEffect(() => {
    if (!selected) setFormPopUp([]);
  }, [selected]);

  const nestedComments = (thisComment.children || []).map((comment) => (
    <Comment
      key={comment.id}
      thisComment={comment}
      selected={selected}
      setSelected={setSelected}
    />
  ));

  return (
    <div className="comment" data-testid="Comment">
      <div className="commentHeader">
        u/
        {thisComment.user}
      </div>
      <div className="commentBody">{thisComment.content}</div>
      <div className="commentFooter">
        <div>{thisComment.votes} upvotes</div>
        <div
          role="button"
          tabIndex="0"
          onKeyDown={() => handleFormPopUp()}
          onClick={() => handleFormPopUp()}
        >
          reply
        </div>
        <div>report</div>
        <br />
      </div>
      {formPopUp.map((child) => child)}
      {nestedComments}
    </div>
  );
}
