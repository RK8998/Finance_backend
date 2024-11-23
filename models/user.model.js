'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          len: [10, 10],
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'user',
      paranoid: true,
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
    }
  );
  return user;
};
