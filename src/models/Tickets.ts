import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import User from './User';
import SeatTickets from './SeatTicket';
import PlanScreenMovie from './PlanScreenMovie';
import Prices from './Prices';

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
      model: PlanScreenMovie,
      key: 'id',
    },
  },
  stId: {
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
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Prices,
      key: 'price',
    },
  },
  ticketsDate: {
    type: DataTypes.DATE,
    allowNull: false,
    // defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Tickets',
  timestamps: false,
});

Tickets.belongsTo(User, { foreignKey: 'userId' });
Tickets.belongsTo(SeatTickets, { foreignKey: 'stId' });
Tickets.belongsTo(PlanScreenMovie, { foreignKey: 'psmId' });
Tickets.belongsTo(Prices, { foreignKey: 'price' });

export default Tickets;