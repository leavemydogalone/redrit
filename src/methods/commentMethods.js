export default function addChildComment(array, parentId, childComment) {
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
          children: childComment.children,
        },
      ];
    } else {
      addChildComment(thing.children, parentId, childComment);
    }
  });

  // for(const comment of arrayCopy) {
  //   const newArray = await
  // }
  return arrayCopy;
}
