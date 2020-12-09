import React from 'react';
import { render } from '@testing-library/react';
import PostBody from '../components/PostBody';

it('should render', () => {
  const { queryByTestId } = render(<PostBody />);
  expect(queryByTestId('PostBody')).toBeTruthy();
});
