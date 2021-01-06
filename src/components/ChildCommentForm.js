import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';
import newCommentArray from '../methods/commentMethods';

export default function ChildCommentForm({ thisComment, postData }) {
  const [childCommentText, setChildCommentText] = useState('');

  const postRef = firebase.firestore().collection('posts').doc(postData.id);
  const commentsRef = firebase.firestore().collection('comments');

  console.log(postData.comments);

  function addChildComment(childComment) {
    const updatedArray = newCommentArray(
      postData.comments,
      thisComment.id,
      childComment
    );
    postRef.update({ comments: updatedArray }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <div className="commentPopUp">
        <textarea
          placeholder="Reply to comment..."
          value={childCommentText}
          onChange={(e) => setChildCommentText(e.target.value)}
        />
        <button
          type="button"
          onClick={() =>
            addChildComment({
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
    </div>
  );
}
