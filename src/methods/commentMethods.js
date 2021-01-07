export default function newCommentArray(array, parentId, childComment) {
  const arrayCopy = array.slice();

  arrayCopy.forEach((thing) => {
    if (thing.id === parentId) {
      // eslint-disable-next-line no-param-reassign
      thing.children = [
        ...thing.children,
        {
          id: childComment.id,
          content: childComment.content,
          user: childComment.user,
          votes: childComment.votes,
          children: [],
        },
      ];
    } else if (thing.children.length > 0) {
      newCommentArray(thing.children, parentId, childComment);
    }
  });

  return arrayCopy;
}
