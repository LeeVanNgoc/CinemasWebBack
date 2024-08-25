import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import Movie from "./Movie";
import Theater from "./Theater";

class MovieTheater extends Model {
  public movieTheaterId!: number;
  public movieTheaterCode!: string;
  public movieCode!: string;
  public theaterCode!: string;
}

MovieTheater.init(
  {
    movieTheaterId: {
      type: DataTypes.INTEGER,
    },
    movieTheaterCode: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    movieCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Movie,
        key: "movieCode",
      },
    },
    theaterCode: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: Theater,
        key: "theaterCode",
      },
    },
  },
  {
    sequelize,
    modelName: "MovieTheater",
    timestamps: false,
  }
);

export default MovieTheater;
