import React from 'react';
import { render } from '@testing-library/react';
import TopBanner from '../components/TopBanner';

it('should render', () => {
  const { queryByTestId } = render(<TopBanner />);
  expect(queryByTestId('TopBanner')).toBeTruthy();
});
