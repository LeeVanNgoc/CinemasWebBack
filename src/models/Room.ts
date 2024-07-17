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
  },
  theaterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Theater,
      key: 'id',
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
});

Room.belongsTo(Theater, { foreignKey:'theaterId' });
export default Room;