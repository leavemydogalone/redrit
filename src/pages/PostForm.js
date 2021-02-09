import React, { useState, useContext, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';
import { addPost, addGroup } from '../methods/firebaseMethods';
import { AuthContext } from '../auth/Auth';
import NewGroupForm from '../components/NewGroupForm';

function PostForm({ handleSuccessPopUp }) {
  const { currentUser } = useContext(AuthContext);
  const [feedsListData, setFeedsListData] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [group, setGroup] = useState('cats');
  const [contentType, setContentType] = useState('text');
  const [newGroupPopUp, setNewGroupPopUp] = useState(false);

  // firebase reference for groups
  const groupsRef = firebase.firestore().collection('groups');

  // one time get of groups
  function getFeedsList() {
    groupsRef.get().then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data().title);
      });
      setFeedsListData(items);
    });
  }

  // gets groups on mount
  useEffect(() => {
    getFeedsList();
  }, []);

  // maps the array of groups into options for the select drop menu
  const feedOptions = feedsListData.map((feed) => (
    <option value={feed} key={feed}>
      {feed}
    </option>
  ));

  // will either add or remove the new group form popup on click and removes the previous group choice from the state
  function handlePopUp() {
    setNewGroupPopUp(!newGroupPopUp);
    setGroup('');
  }

  // function to return user to feeds
  const history = useHistory();
  const returnToFeeds = () => {
    const path = `/`;
    history.push(path);
  };

  // if the new group does not exist in the database, it will add the group to the groupsref
  // then adds the post to the post collection and resets states
  // then it will make the successful post popup and return user to feeds
  async function handleSubmit(newPost) {
    const checkNewGroupName = feedsListData.includes(group);
    if (!checkNewGroupName) addGroup({ title: group });

    await addPost(newPost);

    setTitle('');
    setGroup('');
    setContent('');
    setContentType('');

    await handleSuccessPopUp('Post added successfully!');
    // returnToFeeds();
  }

  // console.log(feedsListData, group, title, content, contentType);
  return (
    <div className="postFormPage">
      <div className="postForm" data-testid="PostForm">
        <h3>Add new post!</h3>
        <label htmlFor="group">
          Group:
          <select
            name="group"
            id="group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            {newGroupPopUp ? '' : feedOptions}
          </select>
        </label>

        <div className="newGroupFormDiv">
          Or add new group{' '}
          <button type="button" id="newGroupButton" onClick={handlePopUp}>
            +
          </button>
          {newGroupPopUp ? (
            <NewGroupForm setGroup={setGroup} group={group} />
          ) : (
            ''
          )}
        </div>

        <label htmlFor="contentType">
          Content type:
          <select
            name="contentType"
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="text">text</option>
            <option value="image">image</option>
          </select>
        </label>

        <label htmlFor="title">
          Title:
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength="2"
            required
          />
        </label>

        <label htmlFor="content">
          <textarea
            name="content"
            placeholder="Enter text/url of image here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minLength="2"
            required
          />
        </label>
        <div>
          <button
            id="newPostSubmit"
            type="button"
            onClick={() => {
              handleSubmit({
                uid: currentUser.uid,
                user: currentUser.displayName,
                title,
                group,
                content,
                id: uuidv4(),
                contentType,
                comments: 0,
                votes: 1,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
              });
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
export default withRouter(PostForm);
