import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';
import { addPost } from '../methods/firebaseMethods';
import { AuthContext } from '../auth/Auth';

export default function PostForm() {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [group, setGroup] = useState('');
  const [contentType, setContentType] = useState('');
  // must add a funtion that pulls the different groups,
  // or maybe just let them contentType it in and let them create new ones if none exist

  // maybe make a newgroup state and when the new group is selected
  // from the select then a text is created and the value of the NewGroup from the 'select'

  // want to also add each post to its 'group' document

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
            <option value="">Choose Here:</option>
            <option value="dogs">dogs</option>
            <option value="newGroup">Enter New Group!</option>
          </select>
        </label>

        <label htmlFor="contentType">
          Content type:
          <select
            name="contentType"
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="">Choose Here:</option>
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
          />
        </label>

        <label htmlFor="content">
          <textarea
            name="content"
            placeholder="Enter text/url of image here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <div>
          <button
            type="button"
            onClick={() => {
              addPost({
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
              setTitle('');
              setGroup('');
              setContent('');
              setContentType('');
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
