import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Room from './Room';

class Seat extends Model {
  public seatId!: number;
  public type!: string;
  public roomId!: string;
  public row!: number;
  public col!: number;
  public isAvailable!: boolean;
}

Seat.init({
  seatId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roomId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Room,
      key: 'roomId',
    },
  },
  row: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  col: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Seat',
  timestamps: false,
});

export default Seat;