import Movie from '../models/Movie';

export const createMovie = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Creating movie with data:', data);
      const newMovie = await Movie.create(data);
      resolve(newMovie);
    } catch (error) {
      console.error('Error creating movie:', error);
      reject(error);
    }
  });
};

export const deleteMovie = async (movieId: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Deleting movie with ID:', movieId);
      const movie = await Movie.findOne({ where: { movieid: movieId } });
      if (!movie) {
        resolve({ errorCode: 1, errorMessage: "Not found movie" });
      } else {
        await movie.destroy();
        resolve({ errorCode: 0, errorMessage: "Movie deleted successfully" });
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
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

      console.log('Editing movie with ID:', id, 'and data:', data);
      const movie = await Movie.findOne({ where: { movieid: id } });
      if (!movie) {
        return resolve({ error: 'Movie not found!' });
      } else {
        Object.assign(movie, data);
        await movie.save();
      }

      resolve({ message: 'Update the movie succeeds!', movie });
    } catch (error) {
      console.error('Error editing movie:', error);
      reject(error);
    }
  });
};

export const getAllMovies = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Fetching all movies');
      const movies = await Movie.findAll();
      resolve(movies);
    } catch (error) {
      console.error('Error fetching all movies:', error);
      reject(error);
    }
  });
};

export const getMovieById = async (movieId: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Fetching movie with ID:', movieId);
      const movie = await Movie.findOne({ where: { movieid: movieId } });
      resolve(movie);
    } catch (error) {
      console.error('Error fetching movie by ID:', error);
      reject(error);
    }
  });
};
