import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class Movie extends Model {
  public movieid!: number;
  public title!: string;
  public description!: string;
  public duration!: number;
  public country!: string;
  public releaseDate!: Date;
  public screenTime!: string;
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
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  screenTime: {
    type: DataTypes.STRING,
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
