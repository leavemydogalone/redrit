import React from 'react';
import addChildComment from '../methods/commentMethods';
import Comments from '../pages/Comments';

const commentsArray = [
  {
    content: 'im the content',
    id: '122243',
    user: 'mrman',
    votes: 2,
    children: [
      {
        content: 'im the content',
        id: '12443',
        user: 'mrman',
        votes: 2,
        children: [],
      },
    ],
  },
  {
    content: 'im the content',
    id: '1232423',
    user: 'mrman',
    votes: 2,
    children: [
      {
        user: 'myguy',
        content: 'stuff',
        id: '12345',
        votes: 3,
        children: [],
      },
    ],
  },
];

test('function should return correct array', () => {
  expect(
    addChildComment(commentsArray, '12345', {
      id: '2342',
      content: 'stuff',
      user: 'guy',
      votes: 2,
      children: [],
    })[1].children[0].children[0]
  ).toMatchObject({
    children: [],
    content: 'stuff',
    id: '2342',
    user: 'guy',
    votes: 2,
  });
});

// describe('reply button', () => {
//   it('should produce form on click', () => {
//     const { getAllByText, getByText } = render(
//       <Comment
//         selected={selected}
//         setSelected={setSelected}
//         thisComment={sampleCommentObj}
//       />
//     );
//     fireEvent.click(getAllByText('reply')[0]);
//     expect(getByText('Reply to comment...')).toBeTruthy();
//     expect(getByText('Submit response!')).toBeTruthy();
//   });
// });

// describe('nested children', () => {
//   it('should render children properly', () => {
//     const { queryAllByTestId } = render(
//       <Comment
//         selected={selected}
//         setSelected={setSelected}
//         thisComment={sampleCommentObj}
//       />
//     );
//     expect(queryAllByTestId('Comment')[0]).toMatchInlineSnapshot();
//   });
// });
