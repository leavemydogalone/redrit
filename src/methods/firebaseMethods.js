import firebase from '../firebase';

const postsRef = firebase.firestore().collection('posts');

export function addPost(newPost) {
  postsRef
    .doc(newPost.id)
    .set(newPost)
    .catch((err) => {
      console.log(err);
      alert('Please make sure all fields are filled out!');
    });
}

export function stuff() {
  return true;
}
