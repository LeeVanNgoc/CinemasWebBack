import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class Price extends Model {
  public priceId!: number;
  public cost!: number;
  public roomType!: string;
  public seatType!: string;
  public isWeekend!: boolean;
}

Price.init({
  priceId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roomType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seatType: {
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

export default Price;