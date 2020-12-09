import React from 'react';
import { render } from '@testing-library/react';
import PostContent from '../components/PostContent';

it('should render', () => {
  const { queryByTestId } = render(<PostContent />);
  expect(queryByTestId('PostContent')).toBeTruthy();
});
