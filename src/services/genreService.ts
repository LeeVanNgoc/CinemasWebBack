import Genre from '../models/Genres';

export const createGenre = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newGenre = await Genre.create(data);
      resolve(newGenre);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteGenre = async (genreId: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const genre = await Genre.findOne({ where: { id: genreId } });
      if (!genre) {
        resolve({ errorCode: 1, errorMessage: "Not found genre" });
      } else {
        await genre.destroy();
        resolve({ errorCode: 0, errorMessage: "Genre deleted successfully" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const editGenre = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    const id = data.id;
    try {
      if (!id) {
        return resolve({ error: 'Missing required parameters!' });
      }

      const genre = await Genre.findOne({ where: { id } });
      if (!genre) {
        return resolve({ error: 'Genre not found!' });
      } else {
        Object.assign(genre, data);
        await genre.save();
      }

      resolve({ message: 'Update the genre succeeds!', genre });
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllGenres = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const genres = await Genre.findAll();
      resolve(genres);
    } catch (error) {
      reject(error);
    }
  });
};

export const getGenreById = async (genreId: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const genre = await Genre.findOne({ where: { id: genreId } });
      resolve(genre);
    } catch (error) {
      reject(error);
    }
  });
};
