import firebase from '../firebase';

const postsRef = firebase.firestore().collection('posts');
const commentsRef = firebase.firestore().collection('comments');
const usersRef = firebase.firestore().collection('users');
const groupsRef = firebase.firestore().collection('groups');

// must add the doc to the person's profile as well for posts and comments

export function addPost(newPost) {
  postsRef
    .doc(newPost.id)
    .set(newPost)
    .catch((err) => {
      console.log(err);
      alert('Please make sure all fields are filled out!');
    });
}

export function addComment(postCommentsRef, newComment) {
  postCommentsRef
    .doc(newComment.id)
    .set(newComment)
    .catch((err) => {
      console.log(err);
      alert('Please make sure all fields are filled out!');
    });
}

export function checkDisplayName(displayName, setUserNameValidity) {
  setUserNameValidity(true);
  usersRef
    .where('displayName', '==', displayName)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUserNameValidity(false);
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
}

export function addGroup(newGroup) {
  groupsRef
    .doc(newGroup.title)
    .set(newGroup)
    .catch((err) => {
      console.log(err);
      alert('Could not add new group');
    });
}

export function getUserVotes(uid, setUserVotes, type) {
  usersRef
    .doc(uid)
    .collection('upVotes')
    .where('type', '==', type)
    .onSnapshot((querySnapShot) => {
      const items = [];
      querySnapShot.forEach((doc) => {
        items.push(doc.data());
      });
      setUserVotes(items);
    });
}

export function getPosts(setLoading, setPosts, feed) {
  function allOrOneFeed() {
    if (feed === 'all') return postsRef;
    return postsRef.where('group', '==', feed);
  }
  setLoading(true);
  allOrOneFeed()
    .get()
    .then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPosts(items);
      setLoading(false);
    })
    .catch((err) => console.log(err));
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

export function addVote(uid, id, voteObj) {
  usersRef
    .doc(uid)
    .collection('upVotes')
    .doc(id)
    .set(voteObj)
    .then(console.log(voteObj, id, uid))
    .catch((err) => console.log(err));
  // need to update the post/comments votes as well
}

export function deleteVote(uid, id) {
  usersRef
    .doc(uid)
    .collection('upVotes')
    .doc(id)
    .delete()
    .catch((err) => console.log(err));
  // might want to add a new key user with lastUpvote, downvote to slow it down
}
