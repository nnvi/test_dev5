'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport_List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Airport_List.init({
    Airport_Code: DataTypes.STRING,
    Airport_Name: DataTypes.STRING,
    City: DataTypes.STRING,
    Foto: DataTypes.STRING,
    Description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Airport_List',
  });
  return Airport_List;
};