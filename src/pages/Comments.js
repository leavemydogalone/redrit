import React, { useEffect, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../auth/Auth';
import firebase from '../firebase';
import Comment from '../components/Comment';
import { nest } from '../methods/commentMethods';
import {
  addComment,
  getVotes,
  getPostData,
  getCommentsData,
} from '../methods/firebaseMethods';

function Comments({ match, handleSuccessPopUp }) {
  const { currentUser } = useContext(AuthContext);

  const [postData, setPostData] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const [votesData, setVotesData] = useState([]);
  const [nestedCommentsArray, setNestedCommentsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [standInText, setStandInText] = useState('loading...');
  const [newCommentText, setNewCommentText] = useState('');
  const [selected, setSelected] = useState(false);

  // all firebase references
  const docRef = firebase.firestore().collection('posts').doc(match.params.id);
  const postCommentsRef = docRef.collection('comments');

  // a single get of post data

  // starts subscriptions on load. May need to cancel them when the page is changed
  useEffect(() => {
    getPostData(docRef, setPostData);
    getCommentsData(postCommentsRef, setCommentsData);
    getVotes(setVotesData, 'comment');
    setLoading(false);

    return () => {
      getCommentsData(postCommentsRef, setCommentsData);
      getPostData(docRef, setPostData);
    };
  }, []);

  // creates a nested array to easily .map through for rendering
  useEffect(() => {
    if (commentsData) {
      setLoading(true);
      const nested = nest(commentsData, null);
      setNestedCommentsArray(nested);
      setLoading(false);
    }
  }, [commentsData]);

  function returnFromSubmit(text) {
    handleSuccessPopUp(text);
    // eslint-disable-next-line no-useless-return
    return;
  }
  // adds the comment to firestore and resets the placeHolder text
  async function handleSubmit() {
    const checkForUser =
      !currentUser && returnFromSubmit('Please sign in to leave a comment!');
    const checkForText =
      newCommentText === '' && handleSuccessPopUp('No empty comments allowed!');
    if (!currentUser || newCommentText === '') return;

    const newComment = currentUser && {
      content: newCommentText,
      parentId: null,
      id: uuidv4(),
      user: currentUser.displayName,
      uid: currentUser.uid,
      votes: 1,
      createdAt: firebase.firestore.Timestamp.now(),
      lastUpdate: firebase.firestore.Timestamp.now(),
      post: postData.id,
    };

    const commentClone = { ...newComment };
    setNewCommentText('');

    addComment(postCommentsRef, commentClone, handleSuccessPopUp);
    handleSuccessPopUp('Comment added successfully!');
  }

  // should add in another stand in text should the gets/subscriptions fail
  if (loading) {
    return <h1>{standInText}</h1>;
  }

  return (
    <div className="commentPage">
      <div className="commentPageContainer">
        <div className="commentPostContent">
          <div>u/{postData.user}</div>
          <br />
          <div>{postData.content}</div>
          <br />
        </div>

        <div className="commentForm">
          <textarea
            placeholder="Enter new comment!"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />

          <button type="button" onClick={() => handleSubmit()}>
            Submit
            <br />
            Comment
          </button>
        </div>
        <div className="commentsList">
          {nestedCommentsArray.map((comment) => (
            <Comment
              votesData={votesData}
              postData={postData}
              thisComment={comment}
              key={comment.id}
              selected={selected}
              setSelected={setSelected}
              postCommentsRef={postCommentsRef}
              handleSuccessPopUp={handleSuccessPopUp}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Comments);
