import React from 'react';
import './componentStyles/voteArrows.css';

export default function VoteArrow({ direction }) {
  const arrow =
    direction === 'up' ? (
      <i className="icono-arrow1-up" />
    ) : (
      <i className="icono-arrow1-down" />
    );
  return <>{arrow} </>;
}
