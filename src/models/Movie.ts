import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class Movie extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public duration!: number;
  public country!: string;
  public releaseDate!: Date;
  public screenTime!: string;
  public image!: string;
  public status!: string;
}

Movie.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
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
  status: {
    type: DataTypes.ENUM('showing', 'coming soon', 'ended'),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Movie',
  tableName: 'Movies',
  timestamps: true,
});

export default Movie;