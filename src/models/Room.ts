import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import Theater from "./Theater";
class Room extends Model {
  public roomId!: number;
  public roomCode!: string;
  public theaterId!: number;
  public ticketId!: number;
  public numberSeats!: number;
  public type!: string;
  public isAvailable!: boolean;
}

Room.init(
  {
    roomId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    roomCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    theaterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Theater,
        key: "theaterId",
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Room",
    timestamps: false,
  }
);

export default Room;
