import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class Theater extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
}

Theater.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Theater',
  tableName: 'Theaters',
  timestamps: true,
});

export default Theater;