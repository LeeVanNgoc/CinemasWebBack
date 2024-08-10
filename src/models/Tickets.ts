import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import User from "./User";
import PlanScreenMovie from "./PlanScreenMovie";

class Tickets extends Model {
  public ticketId!: number;
  public userId!: number;
  public planScreenMovieId!: number;
  public seats!: string;
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
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
    },
    planScreenMovieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PlanScreenMovie,
        key: "planScreenMovieId",
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
Tickets.belongsTo(PlanScreenMovie, { foreignKey: "planScreenMovieId", as: "planScreenMovie" });

export default Tickets;