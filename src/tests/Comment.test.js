import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Comment from '../components/Comment';

const sampleCommentObj = {
  content: 'im the content',
  id: 123,
  user: 'mrman',
  votes: 2,
  children: [
    {
      user: 'myguy',
      content: 'stuff',
      id: '3342424',
      votes: 3,
      children: [
        {
          user: 'im a child',
          content: 'stuff',
          id: '324234gsf',
          votes: 1,
        },
      ],
    },
  ],
};

describe('it should render all parts', () => {
  it('render', () => {
    const { queryByTestId } = render(
      <Comment thisComment={sampleCommentObj} />
    );
    expect(queryByTestId('Comment')).toBeTruthy();
  });
  it('should render text', () => {
    const { queryByText } = render(<Comment thisComment={sampleCommentObj} />);
    expect(queryByText('im the content')).toBeTruthy();
    expect(queryByText('u/mrman')).toBeTruthy();
    expect(queryByText('2 upvotes')).toBeTruthy();
  });
});

describe('nested children', () => {});
describe('reply button', () => {
  it('should produce form on click', () => {
    const { queryByText } = render(<Comment thisComment={sampleCommentObj} />);
    fireEvent.click(queryByText('reply'));
    expect(queryByText('Reply to comment...')).toBeTruthy();
    expect(queryByText('Submit response!')).toBeTruthy();
  });
});
