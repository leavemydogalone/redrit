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

  async function handleSubmit() {
    if (childCommentText === '' || !currentUser) return;
    const newComment = {
      content: childCommentText,
      id: uuidv4(),
      user: currentUser.displayName,
      uid: currentUser.uid,
      votes: 1,
      parentId: thisComment.id,
      post: postData.id,
      createdAt: firebase.firestore.Timestamp.now(),
      lastUpdate: firebase.firestore.Timestamp.now(),
    };

    const newCommentClone = { ...newComment };
    setChildCommentText('');

    await addComment(postCommentsRef, newCommentClone);

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
          onClick={() => handleSubmit()}
        >
          Submit response!
        </button>
      </div>
    </div>
  );
}
