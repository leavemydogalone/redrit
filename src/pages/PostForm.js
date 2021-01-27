import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';
import { addPost, addGroup } from '../methods/firebaseMethods';
import { AuthContext } from '../auth/Auth';
import NewGroupForm from '../components/NewGroupForm';

export default function PostForm() {
  const { currentUser } = useContext(AuthContext);
  const [feedsListData, setFeedsListData] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [group, setGroup] = useState('cats');
  const [contentType, setContentType] = useState('text');
  const [newGroupPopUp, setNewGroupPopUp] = useState(false);

  const groupsRef = firebase.firestore().collection('groups');

  function getFeedsList() {
    groupsRef.get().then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data().title);
      });
      setFeedsListData(items);
    });
  }

  useEffect(() => {
    getFeedsList();
  }, []);

  const feedOptions = feedsListData.map((feed) => (
    <option value={feed} key={feed}>
      {feed}
    </option>
  ));

  function handlePopUp() {
    setNewGroupPopUp(!newGroupPopUp);
    setGroup('');
  }

  async function handleSubmit(newPost) {
    const checkNewGroupName = feedsListData.includes(group);
    if (!checkNewGroupName) addGroup({ title: group });

    addPost(newPost);
    setTitle('');
    setGroup('');
    setContent('');
    setContentType('');
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
