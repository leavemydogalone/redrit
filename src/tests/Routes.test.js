import React from 'react';
import { render } from '@testing-library/react';
import { it, describe, expect, test } from '@jest/globals';
import Routes from '../Routes';

describe('should render', () => {
  it('load header', () => {
    const { queryByText } = render(<Routes />);
    expect(queryByText('Profile')).toBeTruthy();
  });
});
