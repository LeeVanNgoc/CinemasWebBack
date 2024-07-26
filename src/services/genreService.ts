import Genre from '../models/Genres';
import { Op } from 'sequelize';

export const createGenre = async (data: any) => {
  try {
    const existingIds = await Genre.findAll({
      attributes: ['genreId'],
      order: [['genreId', 'ASC']]
    });

    const ids = existingIds.map(genre => genre.genreId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const newGenre = await Genre.create({
      genreId: newId,
      name: data.name,
      description: data.description,
    });

    return {
      errCode: 0,
      message: 'Genre created successfully',
      genre: newGenre
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating genre: ${error}`
    };
  }
};

export const deleteGenre = async (genreId: number) => {
  try {
    const genre = await Genre.findOne({ where: { genreId } });
    if (!genre) {
      return { errCode: 1, message: "Genre not found" };
    } else {
      await genre.destroy();
      return { errCode: 0, message: "Genre deleted successfully" };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting genre: ${error}`
    };
  }
};

export const editGenre = async (data: any) => {
  const genreId = data.genreId;
  try {
    if (!genreId) {
      return { errCode: 4, message: 'Missing required parameters!' };
    }

    const genre = await Genre.findOne({ where: { genreId } });
    if (!genre) {
      return { errCode: 1, message: 'Genre not found!' };
    }

    Object.assign(genre, data);
    await genre.save();

    return { 
      errCode: 0,
      message: 'Update the genre succeeds!',
      genre
    };
  } catch (error) {
    return {
      errCode: 2,
      message: `Error updating genre: ${error}`
    };
  }
};

export const getAllGenres = async () => {
  try {
    const genres = await Genre.findAll();
    return {
      errCode: 0,
      message: 'Get all genres success',
      genres
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting genres: ${error}`
    };
  }
};

export const getGenreById = async (genreId: number) => {
  try {
    const genre = await Genre.findOne({ where: { genreId } });
    if (!genre) {
      return {
        errCode: 1,
        message: 'Genre not found'
      };
    }
    return {
      errCode: 0,
      message: 'Get genre success',
      genre
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting genre: ${error}`
    };
  }
};
