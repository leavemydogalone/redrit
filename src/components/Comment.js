import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
import ChildCommentForm from './ChildCommentForm';

export default function Comment({
  thisComment,
  setSelected,
  selected,
  postData,
}) {
  // using array since .map can run on an empty array so I dont need to use any conditional code
  // for when to render the form pop up
  const [formPopUp, setFormPopUp] = useState([]);

  // logic to maintain only one child comment form at a time on page
  async function handleFormPopUp() {
    await setSelected(false);
    if (formPopUp.length === 1) return;
    setSelected(true);
    setFormPopUp([
      <ChildCommentForm
        key={1}
        thisComment={thisComment}
        postData={postData}
        setSelected={setSelected}
      />,
    ]);
  }

  // if another comment is 'selected' it removes the form from this comment
  useEffect(() => {
    if (!selected) setFormPopUp([]);
  }, [selected]);

  const nestedComments = (thisComment.children || []).map((comment) => (
    <Comment
      key={comment.id}
      thisComment={comment}
      selected={selected}
      setSelected={setSelected}
      postData={postData}
    />
  ));

  return (
    <div className="comment" data-testid="Comment">
      <div className="commentHeader">
        u/
        {thisComment.user}
      </div>
      <div className="commentBody">{thisComment.content}</div>
      <div className="commentFooter">
        <div>{thisComment.votes} upvotes</div>
        <div
          role="button"
          tabIndex="0"
          onKeyDown={() => handleFormPopUp()}
          onClick={() => handleFormPopUp()}
        >
          reply
        </div>
        <div>report</div>
        <br />
      </div>
      {formPopUp.map((child) => child)}
      {nestedComments}
    </div>
  );
}
