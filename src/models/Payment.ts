import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Room from './Room';

class Payment extends Model {
  public paymentId!: number;
  public price!: string;
  public bank!: boolean;
  public cash!: boolean;
  public roomId!: number;

}

Payment.init({
  paymentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bank: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  cash: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  roomId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Room,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Payment',
});
Payment.belongsTo(Room, { foreignKey:'roomId' });

export default Payment;