import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class Theater extends Model {
  public theaterId!: number;
  public name!: string;
  public address!: string;
  public city!: string;
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
  city: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

}, {
  sequelize,
  modelName: 'Theater',
  timestamps: false,
});

export default Theater;