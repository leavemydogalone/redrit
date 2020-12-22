import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// import { it, describe, expect, test } from '@jest/globals';
import Post from '../components/Post';

const setCommentSection = jest.fn();

const commentsLink = (postId) => (
  <div onClick={() => setCommentSection(postId)}>Comments</div>
);

const textPost = {
  title: 'im a text post',
  content: 'im the content',
  contentType: 'text',
  user: 'guyguy',
  votes: 2,
  timeStamp: 'December 12, 2020 at 10:09:52 AM UTC-8',
};
const imgPost = {
  title: 'im an image post',
  content: 'https://i.imgur.com/JlUvsxa.jpg',
  contentType: 'url',
  user: 'guyguy',
  votes: 2,
  timeStamp: 'December 12, 2020 at 10:19:52 AM UTC-8',
};

it('should render', () => {
  const { queryByTestId } = render(
    <Post
      post={textPost}
      setCommentSection={setCommentSection}
      commentsLink={commentsLink}
    />
  );
  expect(queryByTestId('Post')).toBeTruthy();
});

describe('recognizes a text document', () => {
  it('should display tect in body', () => {
    const { queryByTestId } = render(
      <Post
        post={textPost}
        setCommentSection={setCommentSection}
        commentsLink={commentsLink}
      />
    );
    expect(queryByTestId('PostBody')).toMatchInlineSnapshot(`
      <div
        class="postBody"
        data-testid="PostBody"
      >
        im the content
      </div>
    `);
  });
});

describe('should recognize if it is image', () => {
  it('should load an image', () => {
    const { queryByTestId } = render(
      <Post
        post={imgPost}
        setCommentSection={setCommentSection}
        commentsLink={commentsLink}
      />
    );
    expect(queryByTestId('PostBody')).toMatchInlineSnapshot(`
      <div
        class="postBody"
        data-testid="PostBody"
      >
        <img
          alt="post.title"
          src="https://i.imgur.com/JlUvsxa.jpg"
        />
      </div>
    `);
  });
});

describe('Comment link', () => {
  it('should fire the jest function on click', () => {
    const { queryByText } = render(
      <Post
        post={imgPost}
        setCommentSection={setCommentSection}
        commentsLink={commentsLink}
      />
    );
    fireEvent.click(queryByText('Comments'));
    expect(setCommentSection).toHaveBeenCalledTimes(1);
  });
});
