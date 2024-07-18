import Genres from '../models/Genres';

export const createGenre = async (name: string) => {
  try {
    const newGenre = await Genres.create({ name });
    return newGenre;
  } catch (error) {
    throw error;
  }
};

export const getAllGenres = async () => {
  try {
    const genres = await Genres.findAll({
      attributes: ['genreId', 'name'],
    });
    return genres;
  } catch (error) {
    throw error;
  }
};

export const getGenreById = async (genreId: number) => {
  try {
    const genre = await Genres.findByPk(genreId, {
      attributes: ['genreId', 'name'],
    });
    return genre;
  } catch (error) {
    throw error;
  }
};

export const deleteGenre = async (genreId: number) => {
  try {
    const genre = await Genres.findByPk(genreId);
    if (!genre) {
      throw new Error('Genre not found');
    }
    await genre.destroy();
  } catch (error) {
    throw error;
  }
};
