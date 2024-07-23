import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Theater from './Theater';

class Room extends Model {
  public id!: string;
  public theaterId!: string;
  public name!: string;
  public totalSeats!: number;
}

Room.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  theaterId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Theater,
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Room',
  tableName: 'Rooms',
  timestamps: true,
});

Room.belongsTo(Theater, { foreignKey: 'theaterId' });
Theater.hasMany(Room, { foreignKey: 'theaterId' });

export default Room;