import React, { useState } from 'react';
const Blog = ({ blog, increaseLikes, deleteBlog, username }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <br/>
        likes {blog.likes}
        <button onClick={increaseLikes}>like</button>
        <br/>
        {`${blog.user ? blog.user.name : 'No Owner'}`}
        <br/>
        {blog.user && blog.user.username === username &&
        <button onClick={deleteBlog}>remove</button>}
      </div>
    </div>  
  );
};

export default Blog;