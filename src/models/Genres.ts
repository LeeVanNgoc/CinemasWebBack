import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

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
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Genres',
  timestamps: false,
});

export default Genres;
