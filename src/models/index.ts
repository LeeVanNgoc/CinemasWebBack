import { Sequelize } from 'sequelize';

import Genres from './Genres';
import Movie from './Movie';
import PlanScreenMovie from './PlanScreenMovie';
import Room from './Room';
import Seat from './Seat';
import Theater from './Theater';
import Tickets from './Tickets';
import User from './User';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config.js')[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

Genres.hasMany(Movie, { foreignKey: 'genreId' });
Movie.belongsTo(Genres, { foreignKey: 'genreId' });

Movie.hasMany(PlanScreenMovie, { foreignKey: 'movieId' });
PlanScreenMovie.belongsTo(Movie, { foreignKey: 'movieId' });

Room.hasMany(PlanScreenMovie, { foreignKey: 'roomId' });
PlanScreenMovie.belongsTo(Room, { foreignKey: 'roomId' });

Theater.hasMany(Room, { foreignKey: 'theaterId' });
Room.belongsTo(Theater, { foreignKey: 'theaterId' });

Room.hasMany(Seat, { foreignKey: 'roomId' });
Seat.belongsTo(Room, { foreignKey: 'roomId' });

PlanScreenMovie.hasMany(Tickets, { foreignKey: 'planScreenMovieId' });
Tickets.belongsTo(PlanScreenMovie, { foreignKey: 'planScreenMovieId' });

User.hasMany(Tickets, { foreignKey: 'userId' });
Tickets.belongsTo(User, { foreignKey: 'userId' });


export { Sequelize, sequelize };
export { Movie, Genres, PlanScreenMovie, Room, Seat, Theater, Tickets, User };