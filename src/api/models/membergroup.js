'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membergroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Membergroup.Group = Membergroup.belongsTo(models.Group, {
        foreignKey: "groupid"
      });

      Membergroup.User = Membergroup.belongsTo(models.User, {
        foreignKey: "userid"
      });
    }
  }
  Membergroup.init({
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
    role: {
      type: DataTypes.ENUM,
      values: ['member', 'moderator'],
      allowNull: false
    }
  },
    {
      sequelize,
      modelName: 'Membergroup',
    });
  return Membergroup;
};