import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Genres from './Genres';

class Movie extends Model {
  public movieId!: number;
  public title!: string;
  public description!: string;
  public duration!: number;
  public country!: string;
  public releaseDate!: Date;
  public genreId!: number;
  public image!: string;
}

Movie.init({
  movieId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genreId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Genres,
      key: 'genreId',
    },
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Movie',
  timestamps: false,
});

export default Movie;
