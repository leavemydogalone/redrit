import React from 'react';
import { render } from '@testing-library/react';
import BottomBanner from '../components/BottomBanner';

it('should render', () => {
  const { queryByTestId } = render(<BottomBanner />);
  expect(queryByTestId('BottomBanner')).toBeTruthy();
});
