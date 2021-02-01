import React, { useContext } from 'react';
import './componentStyles/voteArrows.css';
import { addVote } from '../methods/firebaseMethods';
import { AuthContext } from '../auth/Auth';

export default function VoteArrow({ direction, voted, post }) {
  const { currentUser } = useContext(AuthContext);

  function handleClick() {
    if (voted) {
      // remove from db
      // return
    }
    addVote();
  }
  const arrow =
    direction === 'up' ? (
      <i className="icono-arrow1-up" id={voted ? 'voted' : 'notVoted'} />
    ) : (
      <i className="icono-arrow1-down" id={voted ? 'voted' : 'notVoted'} />
    );
  return <>{arrow} </>;
}
