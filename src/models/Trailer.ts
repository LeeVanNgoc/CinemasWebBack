import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Movie from './Movie';
import Admin from './Admin';

class Trailer extends Model {
  public id!: number;
  public movie_id!: string;
  public url!: string;
  public description!: string; 
  public upload_date!: Date;
  public admin_id!: number;
}

Trailer.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  upload_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Admin,
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'Trailer',
});

Trailer.belongsTo(Admin, { foreignKey: 'admin_id' });
Admin.hasMany(Trailer, { foreignKey: 'admin_id' })
Trailer.belongsTo(Movie, { foreignKey: 'movie_id' });
Movie.hasMany(Trailer, { foreignKey: 'movie_id' })


export default Trailer;