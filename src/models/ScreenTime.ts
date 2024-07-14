import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
class ScreenTime extends Model {
  public sTimeId!: number;
  public startTime!: Date;
}

ScreenTime.init({
  sTimeId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  
}, {
  sequelize,
  modelName: 'ScreenTime',
});


export default ScreenTime;