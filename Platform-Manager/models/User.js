'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class User extends Model {
  static associate(models) {
    // User has many Posts
    this.hasMany(models.Post, { foreignKey: 'userId', targetKey: 'id' });

    // User has many Comments
    this.hasMany(models.Comment, { foreignKey: 'userId', targetKey: 'id' });
  }
}

User.init(
  {
    // Define user model attributes
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'User',
  }
);

module.exports = User;