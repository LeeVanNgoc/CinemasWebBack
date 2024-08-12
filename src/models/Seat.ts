import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Room from './Room';

class Seat extends Model {
  public seatId!: number;
  public seatCode!: string;
  public type!: string;
  public roomId!: string;
  public row!: string;
  public col!: number;
  public isAvailable!: boolean;

  static generateSeatCode(col: number, row: string): string {
    return `${row}${col}`;
  }
}

Seat.init({
  seatId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  seatCode: {
    type: DataTypes.STRING,
    allowNull: false,
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
  hooks: {
    beforeCreate: (seat, options) => {
      seat.seatCode = Seat.generateSeatCode(seat.col, seat.row);
    },
  },
});

export default Seat;
