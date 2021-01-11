import React from 'react';
import { render } from '@testing-library/react';
import Comment from '../components/Comment';

const selected = false;
const setSelected = jest.fn();

const sampleCommentObj = {
  content: 'im the content',
  id: '123',
  user: 'mrman',
  votes: 2,
  children: [
    {
      user: 'myguy',
      content: 'stuff',
      id: '3342424',
      votes: 3,
    },
  ],
};

describe('it should render all parts', () => {
  it('render', () => {
    const { queryAllByTestId } = render(
      <Comment
        selected={selected}
        setSelected={setSelected}
        thisComment={sampleCommentObj}
      />
    );
    expect(queryAllByTestId('Comment')).toBeTruthy();
  });

  it('should render text', () => {
    const { queryByText } = render(
      <Comment
        selected={selected}
        setSelected={setSelected}
        thisComment={sampleCommentObj}
      />
    );
    expect(queryByText('im the content')).toBeTruthy();
    expect(queryByText('u/mrman')).toBeTruthy();
    expect(queryByText('2 upvotes')).toBeTruthy();
  });
});

// to be moved to Comments test, because this functionality is dependant on parent state.
// better to do e2e
