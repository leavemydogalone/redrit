import React from 'react';
import { render } from '@testing-library/react';
import PostForm from '../pages/PostForm';

describe('should load all parts', () => {
  it('should load', () => {
    const { getByTestId } = render(<PostForm />);
    expect(getByTestId('PostForm')).toBeTruthy();
  });
});
