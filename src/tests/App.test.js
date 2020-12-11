import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('should work', () => {
  it('should render', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('App')).toBeTruthy();
  });
});
