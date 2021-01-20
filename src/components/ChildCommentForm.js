import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../auth/Auth';
import firebase from '../firebase';
import { newCommentArray } from '../methods/commentMethods';
import { addComment } from '../methods/firebaseMethods';

export default function ChildCommentForm({
  thisComment,
  postData,
  setSelected,
}) {
  const { currentUser } = useContext(AuthContext);

  const [childCommentText, setChildCommentText] = useState('');

  // change here to .doc.collection('comments')
  const postRef = firebase.firestore().collection('posts').doc(postData.id);
  const postCommentsRef = postRef.collection('comments');
  const commentsRef = firebase.firestore().collection('comments');

  async function handleSubmit(childComment) {
    if (childCommentText === '') return;
    const childCommentClone = { ...childComment };
    setChildCommentText('');

    await addComment(postCommentsRef, childComment);

    await commentsRef
      .doc(childCommentClone.id)
      .set(childCommentClone)
      .catch((err) => {
        console.log(err);
      });
    setSelected(false);
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
          id="childCommentSubmitButton"
          onClick={() =>
            handleSubmit({
              content: childCommentText,
              id: uuidv4(),
              user: currentUser.displayName,
              userId: currentUser.uid,
              votes: 1,
              parentId: thisComment.id,
              post: postData.id,
              timeStamp: firebase.firestore.Timestamp.now(),
              lastUpdate: firebase.firestore.Timestamp.now(),
            })
          }
        >
          Submit response!
        </button>
      </div>
    </div>
  );
}
