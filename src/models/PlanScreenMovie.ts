import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Room from './Room';

class PlanScreenMovie extends Model {
  public planScreenMovieId!: number;
  public roomId!: number;
  public movieId!: number;
  public startTime!: TimeRanges;
  public endTime!: TimeRanges;
  public space!: string;
}

PlanScreenMovie.init({
  planScreenMovieId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Room,
      key: 'roomId',
    },
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  space: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  sequelize,
  modelName: 'PlanScreenMovie',
  tableName: 'planscreenmovie',
  timestamps: false,
});


export default PlanScreenMovie;