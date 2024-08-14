import Movie from "../models/Movie";

export const createMovie = async (data: {
  title: string;
  description: string;
  releaseDate: string;
  duration: string;
  country: string;
  genreCode: string;
  image: string;
}) => {
  try {
    const existingIds = await Movie.findAll({
      attributes: ["movieId"],
      order: [["movieId", "ASC"]],
    });

    const ids = existingIds.map((movie) => movie.movieId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const existingCodes = await Movie.findAll({
      attributes: ["movieCode"],
      order: [["movieCode", "ASC"]],
    });

    const codes = existingCodes.map((movie) => movie.movieCode);
    let newCode = "MV001";
    if (newId < 10) {
      while (codes.includes(newCode)) {
        newCode = "MV00" + newId;
      }
    } else if (newId >= 10 && newId < 100) {
      while (codes.includes(newCode)) {
        newCode = "MV0" + newId;
      }
    } else {
      while (codes.includes(newCode)) {
        newCode = "MV" + newId;
      }
    }

    const newMovie = await Movie.create({
      movieId: newId,
      movieCode: newCode,
      title: data.title,
      description: data.description,
      releaseDate: data.releaseDate,
      duration: data.duration,
      country: data.country,
      genreCode: data.genreCode,
      image: data.image,
    });

    return {
      errCode: 0,
      message: "Movie created successfully",
      movie: newMovie,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating movie: ${error}`,
    };
  }
};

export const deleteMovie = async (movieCode: string) => {
  try {
    const movie = await Movie.findOne({ where: { movieCode: movieCode } });
    if (!movie) {
      return { errCode: 1, message: "Movie not found" };
    } else {
      await movie.destroy();
      return { errCode: 0, message: "Movie deleted successfully" };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting movie: ${error}`,
    };
  }
};

export const editMovie = async (data: {
  movieCode: string;
  title: string;
  description: string;
  releaseDate: string;
  duration: string;
  country: string;
  genreCode: string;
  image: string;
}) => {
  try {
    const movie = await Movie.findOne({ where: { movieCode: data.movieCode } });
    if (!movie) {
      return { errCode: 1, message: "Movie not found" };
    }

    Object.assign(movie, data);
    await movie.save();

    return {
      errCode: 0,
      message: "Movie updated successfully",
      movie,
    };
  } catch (error) {
    return {
      errCode: 2,
      message: `Error updating movie: ${error}`,
    };
  }
};

export const getAllMovies = async () => {
  try {
    const movies = await Movie.findAll();
    return {
      errCode: 0,
      message: "Get all movies success",
      movies,
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting movies: ${error}`,
    };
  }
};

export const getMovieByCode = async (movieCode: string) => {
  try {
    const movie = await Movie.findOne({ where: { movieCode: movieCode } });
    if (!movie) {
      return {
        errCode: 1,
        message: "Movie not found",
      };
    }
    return {
      errCode: 0,
      message: "Get movie success",
      movie,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting movie: ${error}`,
    };
  }
};

export const getMovieByTitle = async (title: string) => {
  try {
    const movie = await Movie.findOne({ where: { title: title } });
    if (!movie) {
      return {
        errCode: 1,
        message: "Movie not found",
      };
    }
    return {
      errCode: 0,
      message: "Get movie success",
      movie,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting movie: ${error}`,
    };
  }
};
