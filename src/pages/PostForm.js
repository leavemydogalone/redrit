import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('Enter text/url of image here...');
  const [group, setGroup] = useState('');
  const [contentType, setContentType] = useState('');
  // must add a funtion that pulls the different groups,
  // or maybe just let them contentType it in and let them create new ones if none exist

  // maybe make a newgroup state and when the new group is selected
  // from the select then a text is created and the value of the NewGroup from the 'select'
  const postsRef = firebase.firestore().collection('posts');

  function addPost(newPost) {
    postsRef
      .doc(newPost.id)
      .set(newPost)
      .catch((err) => {
        console.log(err);
      });
  }

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
            // defaultValue="Enter text here..."
            value={content}
            onFocus={(e) => {
              if (e.target.value === 'Enter text/url of image here...') {
                setContent('');
              }
            }}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <div>
          <button
            type="button"
            onClick={() => {
              addPost({
                title,
                group,
                content,
                id: uuidv4(),
                contentType,
                comments: [],
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
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
