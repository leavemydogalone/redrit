import React, { useEffect, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../auth/Auth';
import firebase from '../firebase';
import Comment from '../components/Comment';
import { addComment } from '../methods/firebaseMethods';
import { nest } from '../methods/commentMethods';

export default function Comments({ match }) {
  // const postRef = '5117175d-4f70-4e3d-8f96-3e8b10201afd';
  // const postRef = '3b507108-cd52-45cc-bfc3-03f1e2923cfa';
  const { currentUser } = useContext(AuthContext);

  const [postData, setPostData] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const [nestedCommentsArray, setNestedCommentsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [standInText, setStandInText] = useState('loading...');
  const [newCommentText, setNewCommentText] = useState('');
  const [selected, setSelected] = useState(false);

  // all firebase references
  const docRef = firebase.firestore().collection('posts').doc(match.params.id);
  const postCommentsRef = docRef.collection('comments');

  // a single get of post data
  function getPostData() {
    docRef.onSnapshot((doc) => {
      setPostData(doc.data());
    });
  }

  // subscription to all comments of this post for real time updates
  function getCommentsData() {
    postCommentsRef.onSnapshot((querySnapShot) => {
      const items = [];
      querySnapShot.forEach((doc) => {
        items.push(doc.data());
      });
      setCommentsData(items);
    });
  }

  // adds the comment to firestore and resets the placeHolder text
  function handleSubmit(newComment) {
    if (newCommentText === '') return;
    const commentClone = { ...newComment };
    setNewCommentText('');

    addComment(postCommentsRef, commentClone);
  }

  // starts subscription on load. May need to cancel them when the page is changed
  useEffect(() => {
    getPostData();
    getCommentsData();
    setLoading(false);

    return () => {
      getCommentsData();
      getPostData();
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
                parentId: null,
                id: uuidv4(),
                user: currentUser.displayName,
                uid: currentUser.uid,
                votes: 1,
                createdAt: firebase.firestore.Timestamp.now(),
                lastUpdate: firebase.firestore.Timestamp.now(),
                post: postData.id,
              })
            }
          >
            Submit
            <br />
            Comment
          </button>
        </div>
        <div className="commentsList">
          {nestedCommentsArray.map((comment) => (
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
