import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import User from './User';
import SeatTickets from './SeatTicket';
import PlanScreenMovie from './PlanScreenMovie';
import Prices from './Price';

class Tickets extends Model {
  public ticketId!: number;
  public userId!: number;
  public planScreenMovieId!: number;
  public seatTicketId!: number;
  public bank!: string;
  public priceId!: number;
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
  planScreenMovieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PlanScreenMovie,
      key: 'id',
    },
  },
  seatTicketId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SeatTickets,
      key: 'id',
    },
  },
  bank: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Prices,
      key: 'priceId',
    },
  },
  ticketsDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  
}, {
  sequelize,
  modelName: 'Tickets',
  timestamps: false,
});

Tickets.belongsTo(User, { foreignKey:'userId' });
Tickets.belongsTo(SeatTickets, { foreignKey:'seatTicketId' });
Tickets.belongsTo(PlanScreenMovie, { foreignKey:'planScreenMovieId' });
Tickets.belongsTo(Prices, { foreignKey:'price' });

export default Tickets;