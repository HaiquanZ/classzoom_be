'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    postid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
    {
      sequelize,
      modelName: 'Comment',
    });
  return Comment;
};