import React from 'react';
import { render } from '@testing-library/react';
import Post from '../components/Post';

it('should render', () => {
  const { queryByTestId } = render(<Post />);
  expect(queryByTestId('Post')).toBeTruthy();
});
