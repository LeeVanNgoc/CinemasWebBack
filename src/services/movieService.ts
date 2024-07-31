import Movie from '../models/Movie';

export const createMovie = async (data: any) => {
  try {
    const existingIds = await Movie.findAll({
      attributes: ['movieid'],
      order: [['movieid', 'ASC']]
    });

    const ids = existingIds.map(movie => movie.movieid);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const newMovie = await Movie.create({
      movieid: newId,
      title: data.title,
      description: data.description,
      genreId: data.genreId,
      duration: data.duration,
      country: data.country,
      screenTime: data.screenTime,
      image: data.image,
      releaseDate: new Date(),
    });

    return {
      errCode: 0,
      message: 'Movie created successfully',
      movie: newMovie
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating movie: ${error}`
    };
  }
};

export const deleteMovie = async (movieId: number) => {
  try {
    const movie = await Movie.findOne({ where: { movieid: movieId } });
    if (!movie) {
      return { errCode: 1, message: "Movie not found" };
    } else {
      await movie.destroy();
      return { errCode: 0, message: "Movie deleted successfully" };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting movie: ${error}`
    };
  }
};

export const editMovie = async (data: any) => {
  const movieid = data.movieid;
  try {
    if (!movieid) {
      return { errCode: 4, message: 'Missing required parameters!' };
    }

    const movie = await Movie.findOne({ where: { movieid } });
    if (!movie) {
      return { errCode: 1, message: 'Movie not found!' };
    }

    Object.assign(movie, data);
    await movie.save();

    return { 
      errCode: 0,
      message: 'Update the movie succeeds!',
      movie
    };
  } catch (error) {
    return {
      errCode: 2,
      message: `Error updating movie: ${error}`
    };
  }
};

export const getAllMovies = async () => {
  try {
    const movies = await Movie.findAll();
    return {
      errCode: 0,
      message: 'Get all movies success',
      movies
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting movies: ${error}`
    };
  }
};

export const getMovieById = async (movieId: number) => {
  try {
    const movie = await Movie.findOne({ where: { movieid: movieId } });
    if (!movie) {
      return {
        errCode: 1,
        message: 'Movie not found'
      };
    }
    return {
      errCode: 0,
      message: 'Get movie success',
      movie
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting movie: ${error}`
    };
  }
};
