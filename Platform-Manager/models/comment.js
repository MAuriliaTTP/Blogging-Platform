'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Post = require('./post');

class Comment extends Model {
  static associate(models) {
    // Define associations here
  }
}

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Comment',
  }
);


module.exports = Comment;

