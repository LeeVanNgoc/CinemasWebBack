import { Sequelize } from "sequelize";

import Genres from "./Genres";
import Movie from "./Movie";
import PlanScreenMovie from "./PlanScreenMovie";
import Room from "./Room";
import Seat from "./Seat";
import Theater from "./Theater";
import Tickets from "./Tickets";
import User from "./User";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config.js")[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

Genres.hasMany(Movie, { foreignKey: "genreCode" });
Movie.belongsTo(Genres, { foreignKey: "genreCode" });

Movie.hasMany(PlanScreenMovie, { foreignKey: "movieCode" });
PlanScreenMovie.belongsTo(Movie, { foreignKey: "movieCode" });

Room.hasMany(PlanScreenMovie, { foreignKey: "roomCode" });
PlanScreenMovie.belongsTo(Room, { foreignKey: "roomCode" });

Theater.hasMany(Room, { foreignKey: "theaterCode" });
Room.belongsTo(Theater, { foreignKey: "theaterCode" });

Room.hasMany(Seat, { foreignKey: "roomCode" });
Seat.belongsTo(Room, { foreignKey: "roomCode" });

PlanScreenMovie.hasMany(Tickets, { foreignKey: "planScreenMovieCode" });
Tickets.belongsTo(PlanScreenMovie, { foreignKey: "planScreenMovieCode" });

User.hasMany(Tickets, { foreignKey: "userCode" });
Tickets.belongsTo(User, { foreignKey: "userCode" });

export { Sequelize, sequelize };
export { Movie, Genres, PlanScreenMovie, Room, Seat, Theater, Tickets, User };
