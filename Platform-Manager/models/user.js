'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
  static associate(models) {
    // define association here
  }
}

User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'User',
  }
);

module.exports = User;