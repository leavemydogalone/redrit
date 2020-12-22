import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';
import Comment from '../components/Comment';

export default function Comments({ commentSection }) {
  const commentID = '9359d93d-a0be-4320-a4b0-5b7256d0babb';
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);

  const docRef = firebase.firestore().collection('posts').doc(commentID);

  function getPostData() {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setPostData(doc.data());
          setLoading(false);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  useEffect(() => {
    getPostData();
  }, []);

  // return <div className="comments">{commentList}</div>;
  if (loading) {
    return <h1>loading...</h1>;
  }

  // return <div className="comments">{console.log(postData)}</div>;
  // return <div className="comments">{postData.content}</div>;
  return (
    <div className="comments">
      {postData.comments.map((comment) => (
        <Comment thisComment={comment} key={comment.id} />
      ))}
    </div>
  );
}
