import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Theater from './Theater';
class Room extends Model {
  public roomId!: number;
  public ticketId!: number;
  public numberSeats!: number;
  public type!: string;
}

Room.init({
  roomId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  theaterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Theater,
      key: 'theaterId',
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Room',
  timestamps: false,
});

export default Room;