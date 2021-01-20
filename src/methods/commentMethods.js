export function newCommentArray(array, parentId, childComment) {
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

export function nest(data, parentId) {
  return data.reduce((r, e) => {
    const obj = { ...e };
    if (parentId === e.parentId) {
      const children = nest(data, e.id);
      if (children.length) obj.children = children;
      r.push(obj);
    }
    return r;
  }, []);
}
// export function nest(data, parentId = null) {
//   return data.reduce((r, e) => {
//     const obj = { ...e };
//     if (parentId === e.parent_id) {
//       const children = nest(data, e.id);
//       if (children.length) obj.children = children;
//       r.push(obj);
//     }
//     return r;
//   }, []);
// }
