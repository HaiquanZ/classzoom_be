'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assignment.Post = Assignment.hasOne(models.Post, {
        foreignKey: "id"
      });

      // Assignment.Answer = Assignment.hasMany(models.Answer, {
      //   sourceKey: "postid",
      //   foreignKey: "answerPostId",
      //   as: "answer"
      // });
    }
  }
  Assignment.init({
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
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueto: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
    {
      sequelize,
      modelName: 'Assignment',
    });
  return Assignment;
};