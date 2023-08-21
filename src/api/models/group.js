'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.Membergroup = Group.hasMany(models.Membergroup, {
        foreignKey: "groupid",
        as: "members"
      });
    }
  }
  Group.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    groupname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    totalmember: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1
      },
      allowNull: false
    }
  },
    {
      sequelize,
      modelName: 'Group',
    });
  return Group;
};