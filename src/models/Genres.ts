import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import MovieGenre from './MovieGenre'

class Genres extends Model {
  public genreId!: number;
  public name!: string;
  public description!: string;
}

Genres.init({
  genreId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Genres',
  timestamps: false
});

Genres.hasOne(MovieGenre, { foreignKey:'movieGenreId' });
MovieGenre.belongsTo(Genres, { foreignKey:'movieGenreId' });

export default Genres;
