import React from 'react';
import { render } from '@testing-library/react';
// import { it, describe, expect, test } from '@jest/globals';
import Post from '../components/Post';

const textPost = {
  title: 'im a text post',
  content: 'im the content',
  contentType: 'text',
  user: 'guyguy',
};
const imgPost = {
  title: 'im an image post',
  content: 'https://i.imgur.com/JlUvsxa.jpg',
  contentType: 'text',
  user: 'guyguy',
};

it('should render', () => {
  const { queryByTestId } = render(<Post post={textPost} />);
  expect(queryByTestId('Post')).toBeTruthy();
});

describe('recognizes a text document', () => {
  it('should display tect in body', () => {
    const { queryByTestId } = render(<Post post={textPost} />);
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
    const { queryByTestId } = render(<Post post={imgPost} />);
    expect(queryByTestId('PostBody')).toMatchInlineSnapshot(`
      <div
        class="postBody"
        data-testid="PostBody"
      >
        https://i.imgur.com/JlUvsxa.jpg
      </div>
    `);
  });
});
