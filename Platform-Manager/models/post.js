'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Post extends Model {
  static associate(models) {
    // Post belongs to a User
    this.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });

    // Post has many Comments
    this.hasMany(models.Comment, { foreignKey: 'userId', targetKey: 'id' });
  }
}

Post.init(
  {
    // Define post model attributes
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: 'Post',
  }
);

module.exports = Post;
