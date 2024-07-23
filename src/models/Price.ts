import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import SeatType from './SeatType';

class Price extends Model {
  public id!: number;
  public seatTypeId!: number;
  public cost!: number;
  public isWeekend!: boolean;
  public timeOfDay!: string;
}

Price.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  seatTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SeatType,
      key: 'id',
    },
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  isWeekend: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  timeOfDay: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Price',
  tableName: 'Prices',
  timestamps: true,
});

Price.belongsTo(SeatType, { foreignKey: 'seatTypeId' });
SeatType.hasMany(Price, { foreignKey: 'seatTypeId' });

export default Price;