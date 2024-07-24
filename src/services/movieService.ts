import Movie from '../models/Movie';

export const createMovie = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newMovie = await Movie.create({
        title: data.title,
        description: data.description,
        genreId: data.genreId,
        duration: data.duration,
        country: data.country,
        sTimeid: data.sTimeid,
        releaseDate: new Date(),
      });
      resolve(newMovie);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteMovie = async (movieId: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const movie = await Movie.findOne({ where: { id: movieId } });
      if (!movie) {
        resolve({ errorCode: 1, errorMessage: "Not found movie" });
      } else {
        await movie.destroy();
        resolve({ errorCode: 0, errorMessage: "Movie deleted successfully" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const editMovie = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    const id = data.id;
    try {
      if (!id) {
        return resolve({ error: 'Missing required parameters!' });
      }

      const movie = await Movie.findOne({ where: { id } });
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
  return new Promise(async (resolve, reject) => {
    try {
      const movie = await Movie.findOne({ where: { id: movieId } });
      resolve(movie);
    } catch (error) {
      reject(error);
    }
  });
};
