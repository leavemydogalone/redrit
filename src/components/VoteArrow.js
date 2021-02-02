import React, { useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './componentStyles/voteArrows.css';
import { addVote, deleteVote } from '../methods/firebaseMethods';
import { AuthContext } from '../auth/Auth';

export default function VoteArrow({ direction, userVote, parentId, type }) {
  const { currentUser } = useContext(AuthContext);

  function handleClick() {
    if (currentUser) {
      // will delete vote if user clicks the upvote or downvote arrow a second time
      if (userVote.direction === direction) {
        deleteVote(userVote.voteId);
      } else {
        // will either overwrite vote if their is one with same voteId or will create new
        // vote document with id created by uuid
        const voteObj = {
          direction,
          voteId: userVote.voteId || uuidv4(),
          parentId,
          uid: currentUser.uid,
          type,
        };
        addVote(currentUser.uid, parentId, voteObj);
      }
    }
  }

  function determineId() {
    // console.log(userVote);
    if (userVote && userVote.direction === direction) return 'voted';
    return 'notVoted';
  }

  const arrow =
    direction === 'up' ? (
      <i
        className="icono-arrow1-up"
        id={determineId('up')}
        role="button"
        aria-label="upvote"
        tabIndex="0"
        onClick={() => handleClick()}
        onKeyDown={() => handleClick()}
      />
    ) : (
      <i
        className="icono-arrow1-down"
        id={determineId(direction)}
        role="button"
        aria-label="upvote"
        tabIndex="0"
        onClick={() => handleClick()}
        onKeyDown={() => handleClick()}
      />
    );
  return <>{arrow} </>;
}
