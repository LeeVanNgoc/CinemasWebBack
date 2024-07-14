import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class Theater extends Model {
  public theaterid!: number;
  public name!: string;
  public address!: string;
}

Theater.init({
  theaterId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Theater',
});

export default Theater;