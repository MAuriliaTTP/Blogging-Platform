'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class Post extends Model {
  static associate(models) {
    // Define associations here
  }
}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Post',
  }
);

module.exports = Post;