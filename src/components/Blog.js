import React, { useState } from 'react';
const Blog = ({ blog, increaseLikes }) => {
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
      </div>
    </div>  
  );
};

export default Blog;