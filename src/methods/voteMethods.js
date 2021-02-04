export function determinePostVotes(parent, votesData, setVotes) {
  const thisPostVotes = votesData.filter((x) => x.parentId === parent.id);
  setVotes(thisPostVotes);
}

// determines if the current user has voted for the post and sets
// the vote direction
export function determineUserVote(currentUser, votesData, setUserVote) {
  if (currentUser) {
    const userVotedPost =
      votesData[0] && votesData.find((x) => x.uid === currentUser.uid);

    const setVote = userVotedPost
      ? setUserVote(userVotedPost)
      : setUserVote(false);
  }
}
