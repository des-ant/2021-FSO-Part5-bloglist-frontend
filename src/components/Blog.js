import React from 'react';
const Blog = ({ blog }) => {
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
      </div>
      <div>
        {blog.url}
        <br/>
        likes {blog.likes} <button>like</button>
        <br/>
        {`${blog.user ? blog.user.name : 'No Owner'}`}
      </div>
    </div>  
  );
};

export default Blog;