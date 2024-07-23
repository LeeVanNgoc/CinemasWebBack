import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class SeatType extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
}

SeatType.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'SeatType',
  tableName: 'SeatTypes',
  timestamps: true,
});

export default SeatType;