'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {}
  }
  Attendance.init(
    {
      user_id: {
        type: DataTypes.NUMBER,
      },
      clock_in: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      clock_out: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      sequelize,
      tableName: 'attendances',
      modelName: 'Attendance',
      underscored: true,
      timestamps: true,
    }
  );
  return Attendance;
};
