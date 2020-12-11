import React from 'react';
import { render } from '@testing-library/react';
import Post from '../components/Post';

const samplePost = { title: 'im a post', contnent: 'im the content' };
it('should render', () => {
  const { queryByTestId } = render(<Post post={samplePost} />);
  expect(queryByTestId('Post')).toBeTruthy();
});
