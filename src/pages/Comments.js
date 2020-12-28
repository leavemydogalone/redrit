import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';
import Comment from '../components/Comment';

export default function Comments({ commentSection }) {
  // const commentID = '9359d93d-a0be-4320-a4b0-5b7256d0babb';
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [standInText, setStandInText] = useState('loading...');
  const [newCommentText, setNewCommentText] = useState('Enter new comment!');

  const docRef = firebase.firestore().collection('posts').doc(commentSection);
  const commentsRef = firebase.firestore().collection('comments');

  function getPostData() {
    docRef.onSnapshot((doc) => {
      setPostData(doc.data());
      setLoading(false);
    });
  }

  function addComment(newComment) {
    const postDataCopy = { ...postData };
    docRef
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(newComment),
      })
      .then(() => {
        commentsRef
          .doc(newComment.id)
          .set({ post: commentSection, ...newComment });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit(newComment) {
    addComment(newComment);
    setNewCommentText('Enter new comment!');
  }

  useEffect(() => {
    getPostData();
    console.log(postData);
  }, []);

  if (loading) {
    return <h1>{standInText}</h1>;
  }

  return (
    <div className="commentPage">
      <div className="commentForm">
        <textarea
          value={newCommentText}
          onFocus={(e) => {
            if (e.target.value === 'Enter new comment!') {
              setNewCommentText('');
            }
          }}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button
          type="button"
          onClick={
            () =>
              handleSubmit({
                content: newCommentText,
                id: uuidv4(),
                user: 'im a user',
                votes: 1,
                timeStamp: firebase.firestore.Timestamp.now(),
              })
            // eslint-disable-next-line react/jsx-curly-newline
          }
        >
          Submit
          <br />
          Comment
        </button>
      </div>
      <div className="commentSection">
        {postData.comments.map((comment) => (
          <Comment thisComment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}
