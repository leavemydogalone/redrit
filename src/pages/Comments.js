import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';
import Comment from '../components/Comment';

export default function Comments({ commentSection }) {
  const commentID = '4b4d9074-43df-42a9-8dbe-df253ec61683';
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [standInText, setStandInText] = useState('loading...');
  const [newCommentText, setNewCommentText] = useState('');
  const [selected, setSelected] = useState(false);

  const docRef = firebase.firestore().collection('posts').doc(commentID);
  const commentsRef = firebase.firestore().collection('comments');

  function getPostData() {
    docRef.onSnapshot((doc) => {
      setPostData(doc.data());
      setLoading(false);
    });
  }

  function addComment(newComment) {
    // const postDataCopy = { ...postData };
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

  // probably also want the post info on this page at the top. can just have user
  // , content, votes, and a report button
  return (
    <div className="commentPage">
      <div className="commentPageContainer">
        <div className="commentPostContent">
          <div>u/{postData.user}</div>
          <br />
          <div>{postData.content}</div>
          <br />
          <div>votes {postData.votes}</div>
        </div>

        <div className="commentForm">
          <textarea
            placeholder="Enter new comment!"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button
            type="button"
            onClick={() =>
              handleSubmit({
                content: newCommentText,
                id: uuidv4(),
                user: 'im a user',
                votes: 1,
                timeStamp: firebase.firestore.Timestamp.now(),
                children: [],
              })
            }
          >
            Submit
            <br />
            Comment
          </button>
        </div>
        <div className="commentsList">
          {postData.comments.map((comment) => (
            <Comment
              postData={postData}
              thisComment={comment}
              key={comment.id}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
