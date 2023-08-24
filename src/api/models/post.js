'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    groupid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['post', 'call', 'assignment'],
      allowNull: false
    }
  },
    {
      sequelize,
      modelName: 'Post',
    });
  return Post;
};