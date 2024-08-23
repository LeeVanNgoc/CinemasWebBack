import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import Genres from "./Genres";
import Movie from "./Movie";

class MovieGenre extends Model {
  public movieGenreId!: number;
  public movieGenreCode!: string;
  public genreCode!: string;
}

MovieGenre.init(
  {
    movieGenreId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Movie,
        key: "movieid",
      },
    },
    movieGenreCode: {
      type: DataTypes.STRING,
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
    genreCode: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: Genres,
        key: "genreCode",
      },
    },
  },
  {
    sequelize,
    modelName: "MovieGenre",
    timestamps: false,
  }
);

export default MovieGenre;
