import { Sequelize } from 'sequelize';

import Seat from './Seat';
import Room from './Room';
import Theater from './Theater';
import Movie from './Movie';
import MovieGenre from './MovieGenre';
import Genres from './Genres';
import PlanScreenMovie from './PlanScreenMovie';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config.js')[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

Movie.belongsToMany(Genres, { through: MovieGenre, foreignKey: 'movieId' });
Genres.belongsToMany(Movie, { through: MovieGenre, foreignKey: 'genreId' });

Theater.hasMany(Room, { foreignKey: 'theaterId' });
Room.belongsTo(Theater, { foreignKey: 'theaterId' });

Room.hasMany(Seat, { foreignKey: 'theaterId' });
Seat.hasMany(Room, { foreignKey: 'theaterId' });

Room.hasMany(PlanScreenMovie, { foreignKey: 'theaterId' });
PlanScreenMovie.belongsTo(Room, { foreignKey: 'theaterId' });


export { Sequelize, sequelize };
export { Movie, MovieGenre, Genres };
