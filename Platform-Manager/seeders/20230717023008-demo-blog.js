'use strict';

const bcrypt = require("bcryptjs");
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create users
    await User.bulkCreate([
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' },
    ]);

    // Create posts
    await Post.bulkCreate([
      { title: 'Post 1', content: 'Content of Post 1', id: 1 },
      { title: 'Post 2', content: 'Content of Post 2', id: 1 },
    ]);

    // Create comments
    await Comment.bulkCreate([
      { content: 'Comment 1 for Post 1', id: 2, postId: 1 },
      { content: 'Comment 2 for Post 1', id: 1, postId: 1 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};