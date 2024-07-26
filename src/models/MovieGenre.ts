import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Genres from './Genres'

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
  timestamps: false
});

MovieGenre.belongsTo(Genres, { foreignKey:'movieGenreId' });
Genres.hasOne(MovieGenre, { foreignKey:'movieGenreId' });

export default MovieGenre;