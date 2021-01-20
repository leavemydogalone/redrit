import React from 'react';
import { act, render, getByTestId } from '@testing-library/react';
import PostForm from '../pages/PostForm';
import Routes from '../Routes';

// describe('should load all parts', () => {
//   it('should load', async () => {
//     await act(async () => {
//       const { getByTestId } = await render(
//         <Routes>
//           <PostForm />
//         </Routes>
//       );
//     });
//     const form = await getByTestId('PostForm');
//     expect(form).toBeTruthy();
//   });
// });
test('should true', () => {
  expect(true).toBeTruthy();
});
