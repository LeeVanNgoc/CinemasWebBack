import Movie from '../models/Movie';

export const createMovie = async (movieData: any) => {
  const movie = await Movie.create(movieData);
  return movie;
};

export const deleteMovie = async (movieId: number) => {
  const result = await Movie.destroy({ where: { id: movieId } });
  return result;
};

export const editMovie = async (movieData: any) => {
  const { id, ...updatedData } = movieData;
  await Movie.update(updatedData, { where: { id } });
  const updatedMovie = await Movie.findByPk(id);
  return updatedMovie;
};

export const getAllMovies = async () => {
  const movies = await Movie.findAll();
  return movies;
};

export const getMovieById = async (movieId: number) => {
  const movie = await Movie.findByPk(movieId);
  if (!movie) {
    throw new Error('Movie not found');
  }
  return movie;
};
