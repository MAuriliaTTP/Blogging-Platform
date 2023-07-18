const express = require('express');
const app = express();
const session = require('express-session');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const sequelize = require('./sequelize');
require('dotenv').config();

User.hasMany(Post, { foreignKey: 'userId', targetKey: 'id' });
User.hasMany(Comment, { foreignKey: 'userId', targetKey: 'id' });
Post.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
Post.hasMany(Comment, { foreignKey: 'userId', targetKey: 'id' });
Comment.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
Comment.belongsTo(Post, { foreignKey: 'userId', targetKey: 'id' });

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000 // 1 hour
    },
}));
app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);

const authenticatedUser = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'You must be logged in to view this page.' });
  }
  next();
}; 

app.get('/', async (req, res) => {
  try {
    // Create a new user with posts and comments
    const user = await User.create({
      username: 'john_doe',
      email: 'doe@example.com',
      password: 'password123',
      Posts: [
        { title: 'Post 1', content: 'Content of post 1' },
        { title: 'Post 2', content: 'Content of post 2' },
      ],
      Comments: [
        { content: 'Comment 1' },
        { content: 'Comment 2' },
        { content: 'Comment 3' },
      ],
    }, { include: [Post, Comment] });

    // Retrieve all posts for the user
    const posts = await user.getPosts({ foreignKey: 'userId', targetKey: 'id' });

    // Retrieve all comments for the user
    const comments = await user.getComments({ foreignKey: 'userId', targetKey: 'id' });

    // Retrieve the user for a specific post
    const post = await Post.findOne({ where: { id: 1 } });
    let postUser = null;
    if (post !== null) {
      postUser = await post.getUser({ foreignKey: 'userId', targetKey: 'id' });
    }

    // Retrieve the user for a specific comment
    const comment = await Comment.findOne({ where: { id: 1 } });
    let commentUser = null;
    if (comment !== null) {
      commentUser = await comment.getUser({ foreignKey: 'userId', targetKey: 'id' });
    }

    res.json({ user, posts, comments, postUser, commentUser });
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/profile', authenticatedUser, async (req, res) => {
  try {
    // Retrieve the user's profile
    const user = await User.findByPk(req.session.user.id, {
      include: [Post, Comment],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user's profile
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = app;