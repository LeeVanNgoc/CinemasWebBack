import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Movie from './Movie';
import Room from './Room';

class Showtime extends Model {
  public id!: string;
  public movieId!: string;
  public roomId!: string;
  public startTime!: Date;
  public endTime!: Date;
  public showDate!: Date;
  public status!: string;
}

Showtime.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  movieId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Movie,
      key: 'id',
    },
  },
  roomId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Room,
      key: 'id',
    },
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  showDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'ongoing', 'completed', 'cancelled'),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Showtime',
  tableName: 'Showtimes',
  timestamps: true,
});

Showtime.belongsTo(Movie, { foreignKey: 'movieId' });
Showtime.belongsTo(Room, { foreignKey: 'roomId' });
Movie.hasMany(Showtime, { foreignKey: 'movieId' });
Room.hasMany(Showtime, { foreignKey: 'roomId' });

export default Showtime;