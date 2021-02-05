import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/Auth';
import firebase from '../firebase';
import ChildCommentForm from './ChildCommentForm';
import VoteArrow from './VoteArrow';

export default function Comment({
  thisComment,
  setSelected,
  selected,
  postData,
  votesData,
}) {
  const { currentUser } = useContext(AuthContext);
  const [votes, setVotes] = useState([]);
  const [userVote, setUserVote] = useState();

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

  // finds and sets the votes for this particular comment
  function determineCommentVotes() {
    const thisPostVotes = votesData.filter(
      (x) => x.parentId === thisComment.id
    );
    setVotes(thisPostVotes);
  }

  // determines if the current user has voted for the comment and sets
  // the vote direction
  function determineUserVote() {
    if (currentUser) {
      const userVotedPost =
        votes[0] && votes.find((x) => x.uid === currentUser.uid);

      const setVote = userVotedPost
        ? setUserVote(userVotedPost)
        : setUserVote(false);
    }
  }

  // determines if the comment votes change every time the postVotes subscription changes
  // again using a more specific query to watch for changes just to this post's comments would be better
  useEffect(() => {
    determineCommentVotes();
  }, [votesData]);

  useEffect(() => {
    determineUserVote();
  }, [votes]);

  const nestedComments = (thisComment.children || []).map((comment) => (
    <Comment
      key={comment.id}
      votesData={votesData}
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
        <VoteArrow
          direction="up"
          userVote={userVote}
          parentId={thisComment.id}
          type="comment"
        />
        {/* this votes.length needs to be something else */}
        {votes.filter((x) => x.direction === 'up').length -
          votes.filter((x) => x.direction === 'down').length}
        <VoteArrow
          direction="down"
          userVote={userVote}
          parentId={thisComment.id}
          type="comment"
        />
        <div
          role="button"
          tabIndex="0"
          onKeyDown={() => handleFormPopUp()}
          onClick={() => handleFormPopUp()}
        >
          reply
        </div>
      </div>
      {formPopUp.map((child) => child)}
      {nestedComments}
    </div>
  );
}
