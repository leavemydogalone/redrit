import firebase from '../firebase';

const postsRef = firebase.firestore().collection('posts');
const commentsRef = firebase.firestore().collection('comments');

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
