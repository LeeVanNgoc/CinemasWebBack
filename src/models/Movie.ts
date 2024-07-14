import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import ScreenTime from './ScreenTime'
import Genres from './Genres';

class Movie extends Model {
  public movieid!: number;
  public title!: string;
  public description!: string;
  public duration!: number;
  public country!: string;
  public genre!: string;
  public releaseDate!: Date;
  public sTimeId!: string;

}

Movie.init({
  movieid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Genres,
      key: 'id',
    }
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
    references: {
      model: ScreenTime,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Movie',
});

Movie.belongsTo(ScreenTime, { foreignKey:'sTimeid' });
Movie.belongsTo(Genres, { foreignKey:'genreId' });


export default Movie;