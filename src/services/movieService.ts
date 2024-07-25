import Movie from '../models/Movie';

export const createMovie = async (data: any) => {
  try {
    // Find all existing movieids
    const existingIds = await Movie.findAll({
      attributes: ['movieid'],
      order: [['movieid', 'ASC']]
    });

    // Convert to an array of numbers
    const ids = existingIds.map(movie => movie.movieid);

    // Find the smallest available id
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
      sTimeid: data.sTimeid,
      releaseDate: new Date(),
    });

    return newMovie;
  } catch (error) {
    throw error;
  }
};

export const deleteMovie = async (movieId: number) => {
  try {
    const movie = await Movie.findOne({ where: { movieid: movieId } });
    if (!movie) {
      return { errorCode: 1, errorMessage: "Not found movie" };
    } else {
      await movie.destroy();
      return { errorCode: 0, errorMessage: "Movie deleted successfully" };
    }
  } catch (error) {
    throw error;
  }
};

export const editMovie = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    const movieid = data.movieid;
    try {
      if (!movieid) {
        return resolve({ error: 'Missing required parameters!' });
      }

      const movie = await Movie.findOne({ where: { movieid } });
      if (!movie) {
        return resolve({ error: 'Movie not found!' });
      } else {
        Object.assign(movie, data);
        await movie.save();
      }

      resolve({ message: 'Update the movie succeeds!', movie });
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllMovies = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const movies = await Movie.findAll();
      resolve(movies);
    } catch (error) {
      reject(error);
    }
  });
};

export const getMovieById = async (movieId: number) => {
  try {
    const movie = await Movie.findOne({ where: { movieid: movieId } });
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  } catch (error) {
    throw error;
  }
};