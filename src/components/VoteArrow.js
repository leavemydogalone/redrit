import React, { useContext, useEffect } from 'react';
import './componentStyles/voteArrows.css';
import { addVote, deleteVote } from '../methods/firebaseMethods';
import { AuthContext } from '../auth/Auth';

export default function VoteArrow({ direction, voted, id, type }) {
  const { currentUser } = useContext(AuthContext);

  const voteObj = {
    direction,
    id,
    uid: currentUser.uid,
    type,
  };

  function handleClick() {
    if (voted) {
      deleteVote(currentUser.uid, id);
    } else {
      addVote(currentUser.uid, id, voteObj);
    }
  }

  //   useEffect(() => {
  //     console.log(voted);
  //   }, [voted]);
  const arrow =
    direction === 'up' ? (
      <i
        className="icono-arrow1-up"
        id={voted ? 'voted' : 'notVoted'}
        role="button"
        aria-label="upvote"
        tabIndex="0"
        onClick={() => handleClick()}
        onKeyDown={() => handleClick()}
      />
    ) : (
      <i
        className="icono-arrow1-down"
        id={voted ? 'voted' : 'notVoted'}
        role="button"
        aria-label="upvote"
        tabIndex="0"
        onClick={() => handleClick()}
        onKeyDown={() => handleClick()}
      />
    );
  return <>{arrow} </>;
}
