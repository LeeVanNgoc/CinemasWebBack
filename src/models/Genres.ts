import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class Genres extends Model {
  public genreId!: number;
  public name!: string;
}

Genres.init({
  genreId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,    
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Genres',
  tableName: 'Genres',
  timestamps: false,
});

export default Genres;