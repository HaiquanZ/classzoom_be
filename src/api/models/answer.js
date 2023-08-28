'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.User = Answer.belongsTo(models.User, {
        foreignKey: "userid"
      });

      Answer.Assignment = Answer.belongsTo(models.Assignment, {
        targetKey: "postid",
        as: "assignment"
      });
    }
  }
  Answer.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    postid: {
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
      defaultValue: 'none',
    }
  },
    {
      sequelize,
      modelName: 'Answer',
    });
  return Answer;
};