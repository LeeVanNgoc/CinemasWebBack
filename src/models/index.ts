import { Sequelize } from 'sequelize';

import Movie from './Movie';
import MovieGenre from './MovieGenre';
import Genres from './Genres';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config.js')[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

Movie.hasOne(MovieGenre, { foreignKey: 'movieid' });
MovieGenre.belongsTo(Movie, { foreignKey: 'movieid' });

Genres.hasMany(MovieGenre, { foreignKey: 'genreId' });
MovieGenre.belongsTo(Genres, { foreignKey: 'genreId' });

export { Sequelize, sequelize };
export { Movie, MovieGenre, Genres };
