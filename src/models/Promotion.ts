import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Admin from './Admin';


class Promotion extends Model {
  public id!: number;
  public description!: string;
  public discount!: string;
  public startDate!: Date;
  public endDate!: Date;
}

Promotion.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  discount  : {
    type: DataTypes.DECIMAL,
    allowNull: false,
    unique: true,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
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
  modelName: 'Promotion',
  tableName: 'Promotions',
  timestamps: false,
});

Promotion.belongsTo(Admin, { foreignKey: 'admin_id' });
Admin.hasMany(Promotion, { foreignKey: 'admin_id' });

export default Promotion;