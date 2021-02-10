import firebase from '../firebase';

const backgroundRef = firebase.storage().ref('prism.png');
const postsRef = firebase.firestore().collection('posts');
const usersRef = firebase.firestore().collection('users');
const groupsRef = firebase.firestore().collection('groups');
const votesRef = firebase.firestore().collection('votes');

// must add the doc to the person's profile as well for posts and comments
export function getBackground(setBackgroundUrl, handleError) {
  backgroundRef
    .getDownloadURL()
    .then((url) => {
      setBackgroundUrl(url);
    })
    .catch((err) => {});
}

export function addPost(newPost, handleError) {
  postsRef
    .doc(newPost.id)
    .set(newPost)
    .catch((err) => {
      handleError('Please make sure all fields are filled out!');
    });
}

export function getPostData(docRef, setPostData) {
  docRef.onSnapshot((doc) => {
    setPostData(doc.data());
  });
}

// subscription to all comments of this post for real time updates
export function getCommentsData(postCommentsRef, setCommentsData) {
  postCommentsRef.onSnapshot((querySnapShot) => {
    const items = [];
    querySnapShot.forEach((doc) => {
      items.push(doc.data());
    });
    setCommentsData(items);
  });
}

export function addComment(postCommentsRef, newComment, handleError) {
  postCommentsRef
    .doc(newComment.id)
    .set(newComment)
    .catch((err) => {
      // console.log(err);
      handleError('Please make sure all fields are filled out!');
    });
}

export function deleteComment(postCommentsRef, commentId, handleError) {
  postCommentsRef
    .doc(commentId)
    .delete()
    .catch((err) => {
      handleError(err);
    });
}

export function getAllUsersData(setAllUsersData, handleError) {
  usersRef
    .get()
    .then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAllUsersData(items);
    })
    .catch((error) => {
      handleError('Error getting user details');
    });
}

export function addGroup(newGroup, handleError) {
  groupsRef
    .doc(newGroup.title)
    .set(newGroup)
    .catch((err) => {
      handleError('Could not add new group');
    });
}

// single get of either all posts or for a specific feed and orders them by recency
export function getPosts(setLoading, setPosts, feed, handleError) {
  // determines if it needs to pull all posts or just for a specific group
  function allOrOneFeed() {
    if (feed === 'all') return postsRef;
    return postsRef.where('group', '==', feed);
  }

  setLoading(true);
  allOrOneFeed()
    .orderBy('createdAt', 'desc')
    .get()
    .then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPosts(items);
      setLoading(false);
    })
    .catch((err) => handleError(err));
}

export function getFeeds(setFeedsData) {
  groupsRef.get().then((querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data().title);
    });
    setFeedsData(items);
  });
}

export function getVotes(setVotes, type) {
  // function postsOrComment(){
  //   if(type == 'post') return votesRef
  //   return votesRef.where('postId', '==', postId)
  // }
  // would need to make another function for commentVotes,
  // because would need postId as additional param and would need to get
  // the post's votes. Also would need to change vote objects sent to db
  // with new key: postId
  // or maybe not. can just use docs whose parentId show up in commentsData
  votesRef.where('type', '==', type).onSnapshot((querySnapShot) => {
    const items = [];
    querySnapShot.forEach((doc) => {
      items.push(doc.data());
    });
    setVotes(items);
  });
}

export function addVote(uid, id, voteObj, handleError) {
  votesRef
    .doc(voteObj.voteId)
    .set(voteObj)
    .catch((err) => handleError(err));
  // need to update the post/comments votes as well
}

export function deleteVote(voteId, handleError) {
  votesRef
    .doc(voteId)
    .delete()
    .catch((err) => handleError(err));
  // might want to add a new key user with lastUpvote, downvote to slow it down
}

export function deletePost(postId, handleError) {
  postsRef
    .doc(postId)
    .delete()
    .catch((err) => {
      handleError(err);
    });
}
