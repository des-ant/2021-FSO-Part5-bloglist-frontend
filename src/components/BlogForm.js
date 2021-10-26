import React from 'react';

const BlogForm = (blog) => (
  <form onSubmit={blog.addBlog}>
    <div>
      title:
      <input
        type="text"
        value={blog.title}
        name="Title"
        onChange={blog.handleTitleChange}
      />
    </div>
    <div>
      author:
      <input
        type="text"
        value={blog.author}
        name="Author"
        onChange={blog.handleAuthorChange}
      />
    </div>
    <div>
      url:
      <input
        type="text"
        value={blog.url}
        name="Url"
        onChange={blog.handleUrlChange}
      />
    </div>
    <button type="submit">create</button>
  </form>
);

export default BlogForm;