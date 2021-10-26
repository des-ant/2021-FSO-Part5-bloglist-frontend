import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [notification, setNotification] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    // Check if user details of logged-in user can be found on the local storage
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notifyWith = (message, type='success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      notifyWith('logged in successfully');
      setUsername('');
      setPassword('');
    } catch (exception) {
      notifyWith(`${exception.response.data.error}`, 'error');
    }
  };

  // Update text field to reflect keyboard input
  const handleUsernameChange = ({ target }) => setUsername(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);

  const handleLogout = (event) => {
    event.preventDefault();

    // Logout user by removing login details from the local storage in browser
    window.localStorage.removeItem('loggedBlogappUser');

    // Remove user details from state, thus reloading the App UI
    setUser(null);
    notifyWith('logged out successfully');
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    try {
      const returnedNote = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedNote));
      notifyWith(`a new blog ${returnedNote.title} by ${returnedNote.author} added`);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      notifyWith(`${exception.response.data.error}`, 'error');
    }
  };

  const handleTitleChange = ({ target }) => setTitle(target.value);
  const handleAuthorChange = ({ target }) => setAuthor(target.value);
  const handleUrlChange = ({ target }) => setUrl(target.value);

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification
          notification={notification}
        />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        notification={notification}
      />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <h2>create new</h2>
      <BlogForm
          addBlog={addBlog}
          title={title}
          handleTitleChange={handleTitleChange}
          author={author}
          handleAuthorChange={handleAuthorChange}
          url={url}
          handleUrlChange={handleUrlChange}
        />
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
};

export default App;