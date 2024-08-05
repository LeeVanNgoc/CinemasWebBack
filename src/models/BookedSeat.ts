import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Room from './Room';
import PlanScreenMovie from './PlanScreenMovie';

class BookedSeat extends Model {
  public BookedSeatId!: number;
  public planSCreenMovieId!: number;
  public roomId!: number;
  public row!: string;
  public col!: number;
}

BookedSeat.init({
  bookedSeatId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  planSCreenMovieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PlanScreenMovie',
      key: 'planScreenMovieId',
    }
  },
  roomId: {
    type: DataTypes.INTEGER,
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
}, {
  sequelize,
  modelName: 'BookedSeat',
  timestamps: false,
});

BookedSeat.belongsTo(Room, { foreignKey: 'roomId' });
BookedSeat.belongsTo(PlanScreenMovie, { foreignKey: 'planScreenMovieId' });
export default BookedSeat;