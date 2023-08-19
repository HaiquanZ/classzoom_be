'use strict';
import bcrypt from 'bcrypt';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Please enter a valid email address!"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: "Password must be at least 8 characters long"
        }
      }
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['male', 'female'],
      allowNull: false
    }
  },
    {
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      sequelize,
      modelName: 'User',
    });
  return User;
};