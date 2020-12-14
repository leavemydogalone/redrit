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

describe('all the info displayed correcly', () => {
  it('should ', () => {
    const { queryByTestId } = render(<Post post={textPost} />);
    expect(queryByTestId('Post')).toBeTruthy();
  });
});

describe('should recognize if it is text or image', () => {
  it('should load an image', () => {
    const { queryByTestId } = render(<Post post={imgPost} />);
    expect(queryByTestId('Post')).toMatchInlineSnapshot(`
      <div
        class="post"
        data-testid="Post"
      >
        <div
          class="topBanner"
          data-testid="TopBanner"
        >
          im the top banner of a post
        </div>
        <b>
          im an image post
        </b>
        <br />
        <div>
          https://i.imgur.com/JlUvsxa.jpg
        </div>
        <div
          class="bottomBanner"
          data-testid="BottomBanner"
        >
          im the bottom banner of the post
        </div>
      </div>
    `);
  });
});
