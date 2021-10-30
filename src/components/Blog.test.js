import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;

  beforeEach(() => {
    const blog = {
      title: 'Blog title should be rendered',
      author: 'Blog author should also be rendered',
      url: 'Blog url should not be rendered by default'
    };

    const mockHandler = jest.fn();
    const username = 'mockUser';

    component = render(
      <Blog
        blog={blog}
        increaseLikes={mockHandler}
        deleteBlog={mockHandler}
        username={username}
      />
    );
  });

  test('renders title and author but not url or number of likes by default', () => {
    expect(component.container).toHaveTextContent(
      'Blog title should be rendered'
    );

    expect(component.container).toHaveTextContent(
      'Blog author should also be rendered'
    );

    const blogTitleAuthor = component.getByText(
      'Blog title should be rendered Blog author should also be rendered'
    );
    expect(blogTitleAuthor).toBeVisible();

    const blogUrl = component.getByText(
      'Blog url should not be rendered by default'
    );
    expect(blogUrl).not.toBeVisible();
    const blogUrlParent = blogUrl.parentElement;
    expect(blogUrlParent).toHaveStyle('display: none');

    const blogLikes = component.getByText(
      'likes'
    );
    expect(blogLikes).not.toBeVisible();
    const blogLikesParent = blogLikes.parentElement;
    expect(blogLikesParent).toHaveStyle('display: none');
  });

  test('blogs url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);

    console.log(prettyDOM(component.container));

    const blogUrl = component.getByText(
      'Blog url should not be rendered by default'
    );
    expect(blogUrl).toBeVisible();
    const blogUrlParent = blogUrl.parentElement;
    expect(blogUrlParent).not.toHaveStyle('display: none');

    const blogLikes = component.getByText(
      'likes'
    );
    expect(blogLikes).toBeVisible();
    const blogLikesParent = blogLikes.parentElement;
    expect(blogLikesParent).not.toHaveStyle('display: none');
  });
});

