import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import Theater from "./Theater";
class Room extends Model {
  public roomId!: number;
  public roomCode!: string;
  public theaterCode!: string;
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
    theaterCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Theater,
        key: "theaterCode",
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
