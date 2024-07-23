import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Room from './Room';

class Seat extends Model {
  public id!: string;
  public roomId!: string;
  public type!: string;
  public row!: number;
  public column!: number;
}

Seat.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  roomId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Room,
      key: 'id',
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  row: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  column: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Seat',
  tableName: 'Seats',
  timestamps: true,
});

Seat.belongsTo(Room, { foreignKey: 'roomId' });
Room.hasMany(Seat, { foreignKey: 'roomId' });

export default Seat;