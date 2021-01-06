import React from 'react';
import { render } from '@testing-library/react';
import { it, describe, expect, test } from '@jest/globals';
import Routes from '../Routes';

describe('should render', () => {
  it('load header', async () => {
    const { findByText } = render(<Routes />);
    const profile = await findByText('Profile');
    expect(profile).toBeTruthy();
  });
});
