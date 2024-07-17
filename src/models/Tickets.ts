import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import User from './User';
import Theater from './Theater';
import Seat from './Seat';
import Room from './Room';
import Movie from './Movie';
import Payment from './Prices';

class Tickets extends Model {
  public ticketId!: number;
  public userId!: number;
  public psmId!: number;
  public stId!: number;
  public bank!: string;
  public price!: number;
  public TicketsDate!: Date;
}

Tickets.init({
  ticketId: {
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
  psmId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Theater,
      key: 'id',
    },
  },
  stId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Seat,
      key: 'id',
    },
  },
  bank: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Room,
      key: 'id',
    },
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Payment,
      key: 'id',
    },
  },
  ticketsDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Tickets',
});

Tickets.belongsTo(User, { foreignKey:'userId' });
Tickets.belongsTo(Seat, { foreignKey:'seatId' });
Tickets.belongsTo(Theater, { foreignKey:'theaterId' });
Tickets.belongsTo(Movie, { foreignKey:'movieId' });
Tickets.belongsTo(Payment, { foreignKey:'paymentId' });

export default Tickets;