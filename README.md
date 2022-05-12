[Redrit](https://redrit-75871.web.app/)

My version of the reddit website, created as part of the curriculum of The Odin Project using React and Firebase Firestore.

React, Firebase

React was used to create a fast, single-page application and used React Router to handle the routing between the different tabs/pages and different routes based on user login status.

Firebase was used as my BaaS because it offers everything I needed for this project all in one package. User authentication, easy to read and write validation, and a NoSQL database.

View posts on the main page, and you can sort based on the sub-group you would like to view posts from. If you would like to create a post or comment on a post you will need to first create an account by clicking the appropriate button in the top bar.

Create an account and you will automatically be logged in and your login info will be saved for use on later visits. Once you have created your account you are free to create a post or leave a comment which will be cleaned and validated before it is accepted by the backend.

Challenges:
-My limited CSS skills at the time of creation which I am slowly working on correcting

-User authentication was a big pain to impliment as it was something I needed to tackle before I could do much else in the project and figuring out what to load/allow based on user login status

updates to add:

-Set up link in profile to users posts and comments

-In the future would create more collections for votes where each post would have
its own collection for upvotes in addition to the comments, so they would be easier
to query, rather than just having one large collection of all votes.
For profile list, could just have reference to the post/comment they made, do not need full copy of the object.
