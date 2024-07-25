import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class Prices extends Model {
  public pricesId!: number;
  public cost!: number;
  public type!: string;
  public isWeekend!: boolean;
}

Prices.init({
  pricesId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isWeekend: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Prices',
  timestamps: false,
});

export default Prices;