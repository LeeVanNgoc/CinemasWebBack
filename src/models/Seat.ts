import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Room from './Room';
import SeatType from './SeatType';

class Seat extends Model {
  public id!: string;
  public roomId!: string;
  public seatTypeId!: number;
  public row!: string;
  public number!: number;
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
  seatTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SeatType,
      key: 'id',
    },
  },
  row: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
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
Seat.belongsTo(SeatType, { foreignKey: 'seatTypeId' });
Room.hasMany(Seat, { foreignKey: 'roomId' });
SeatType.hasMany(Seat, { foreignKey: 'seatTypeId' });

export default Seat;