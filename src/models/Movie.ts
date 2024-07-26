import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import MovieGenre from './MovieGenre';

class Movie extends Model {
  public movieid!: number;
  public title!: string;
  public description!: string;
  public duration!: number;
  public country!: string;
  public genreId!: number;
  public releaseDate!: Date;
  public sTimeId!: string;

}

Movie.init({
  movieid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genreId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sTimeid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Movie',
  timestamps: false
});

export default Movie;