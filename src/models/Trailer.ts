import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import User from './User';
import Seat from './Seat';

class Trailer extends Model {
  public trailerId!: number;
  public movieId!: string;
  public link!: string;
}

Trailer.init({
  trailerId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  link: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Trailer',
});

Trailer.belongsTo(User,  { foreignKey:'userId' });
Trailer.belongsTo(Seat,  { foreignKey:'seatId' });

export default Trailer;