import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import User from "./User";
import SeatTickets from "./SeatTicket";
import PlanScreenMovie from "./PlanScreenMovie";
import Prices from "./Price";

class Tickets extends Model {
  public ticketId!: number;
  public userId!: number;
  public planScreenMovieId!: string;
  public seats!: number;
  public bank!: string;
  public totalPrice!: number;
  public TicketsDate!: Date;
}

Tickets.init(
  {
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
        key: "id",
      },
    },
    planScreenMovieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PlanScreenMovie,
        key: "id",
      },
    },
    seats: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ticketsDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Tickets",
    timestamps: false,
  }
);

Tickets.belongsTo(User, { foreignKey: "userId" });
Tickets.belongsTo(PlanScreenMovie, { foreignKey: "planScreenMovieId" });

export default Tickets;
