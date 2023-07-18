'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Comment extends Model {
  static associate(models) {
    // Comment belongs to a User
    this.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });

    // Comment belongs to a Post
    this.belongsTo(models.Post, { foreignKey: 'userId', targetKey: 'id' });
  }
}

Comment.init(
  {
    // Define comment model attributes
    content: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: 'Comment',
  }
);

module.exports = Comment;