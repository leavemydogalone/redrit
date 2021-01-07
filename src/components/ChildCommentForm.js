import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../auth/Auth';
import firebase from '../firebase';
import newCommentArray from '../methods/commentMethods';

export default function ChildCommentForm({
  thisComment,
  postData,
  setSelected,
}) {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);
  const [childCommentText, setChildCommentText] = useState('');

  const postRef = firebase.firestore().collection('posts').doc(postData.id);
  const commentsRef = firebase.firestore().collection('comments');

  async function handleSubmit(childComment) {
    const updatedArray = newCommentArray(
      postData.comments,
      thisComment.id,
      childComment
    );

    await postRef.update({ comments: updatedArray }).catch((err) => {
      console.log(err);
    });

    await commentsRef
      .doc(childComment.id)
      .set(childComment)
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
          onClick={() =>
            handleSubmit({
              content: childCommentText,
              id: uuidv4(),
              user: currentUser.displayName,
              userId: currentUser.uid,
              votes: 1,
              parentComment: thisComment.id,
              post: postData.id,
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
