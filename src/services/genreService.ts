import Genre from '../models/Genres';

export const createGenre = async (data: any) => {
  try {
    const newGenre = await Genre.create(data);
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
    const genre = await Genre.findOne({ where: { id: genreId } });
    if (!genre) {
      return { errCode: 1, message: "Not found genre" };
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
  const id = data.id;
  try {
    if (!id) {
      return { errCode: 2, message: 'Missing required parameters!' };
    }

    const genre = await Genre.findOne({ where: { id } });
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
      errCode: 3,
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
    const genre = await Genre.findOne({ where: { id: genreId } });
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
