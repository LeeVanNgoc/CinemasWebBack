import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Showtime from './Showtime'

class MovieGenre extends Model {
  public movieGenreId!: number;
  public genreId!: string;
}

MovieGenre.init({
  movieGenreId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'MovieGenre',
});

MovieGenre.belongsTo(Showtime, { foreignKey:'sTimeId' });

export default MovieGenre;