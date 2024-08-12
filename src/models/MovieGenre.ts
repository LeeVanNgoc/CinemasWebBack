import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import Genres from "./Genres";
import Movie from "./Movie";

class MovieGenre extends Model {
  public movieGenreId!: number;
  public movieGenreCode!: string;
  public genreId!: number;
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
    genreId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Genres,
        key: "genreId",
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
