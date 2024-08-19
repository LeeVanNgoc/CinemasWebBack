import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connectDB";

class Otp extends Model {
  public otpId!: number;
  public email!: string;
  public otpCode!: string;
}

Otp.init(
  {
    otpId: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otpCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "OTPs",
    timestamps: false,
  }
);

export default Otp;
