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
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Genres',
  timestamps: false
});

export default Genres;
