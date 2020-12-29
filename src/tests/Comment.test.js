import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Comment from '../components/Comment';

const sampleCommentObj = {
  content: 'im the content',
  id: 123,
  user: 'mrman',
  votes: 2,
  children: [
    {
      user: 'myguy',
      content: 'stuff',
      id: '3342424',
      votes: 3,
      children: [
        {
          user: 'im a child',
          content: 'stuff',
          id: '324234gsf',
          votes: 1,
        },
      ],
    },
  ],
};

describe('it should render all parts', () => {
  it('render', () => {
    const { queryAllByTestId } = render(
      <Comment thisComment={sampleCommentObj} />
    );
    expect(queryAllByTestId('Comment')).toBeTruthy();
  });

  it('should render text', () => {
    const { queryByText } = render(<Comment thisComment={sampleCommentObj} />);
    expect(queryByText('im the content')).toBeTruthy();
    expect(queryByText('u/mrman')).toBeTruthy();
    expect(queryByText('2 upvotes')).toBeTruthy();
  });
});

describe('reply button', () => {
  it('should produce form on click', () => {
    const { getAllByText, getByText } = render(
      <Comment thisComment={sampleCommentObj} />
    );
    fireEvent.click(getAllByText('reply')[0]);
    expect(getByText('Reply to comment...')).toBeTruthy();
    expect(getByText('Submit response!')).toBeTruthy();
  });
});

describe('nested children', () => {
  it('should render children properly', () => {
    const { queryAllByTestId } = render(
      <Comment thisComment={sampleCommentObj} />
    );
    expect(queryAllByTestId('Comment')[0]).toMatchInlineSnapshot(`
        <div
          class="comment"
          data-testid="Comment"
        >
          <div
            class="commentHeader"
          >
            u/
            mrman
          </div>
          <div
            class="commentBody"
          >
            im the content
          </div>
          <div
            class="commentFooter"
          >
            <div>
              2
               upvotes
            </div>
            <div
              role="button"
              tabindex="0"
            >
              reply
            </div>
            <div>
              report
            </div>
            <br />
          </div>
          <div
            class="comment"
            data-testid="Comment"
          >
            <div
              class="commentHeader"
            >
              u/
              myguy
            </div>
            <div
              class="commentBody"
            >
              stuff
            </div>
            <div
              class="commentFooter"
            >
              <div>
                3
                 upvotes
              </div>
              <div
                role="button"
                tabindex="0"
              >
                reply
              </div>
              <div>
                report
              </div>
              <br />
            </div>
            <div
              class="comment"
              data-testid="Comment"
            >
              <div
                class="commentHeader"
              >
                u/
                im a child
              </div>
              <div
                class="commentBody"
              >
                stuff
              </div>
              <div
                class="commentFooter"
              >
                <div>
                  1
                   upvotes
                </div>
                <div
                  role="button"
                  tabindex="0"
                >
                  reply
                </div>
                <div>
                  report
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      `);
  });
});
