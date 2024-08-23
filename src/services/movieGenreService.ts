import MovieGenre from "../models/MovieGenre";
import Movie from "../models/Movie";
import Genres from "../models/Genres";
import { getGenreByCode } from "./genreService";
import { any } from "joi";

export const createMovieGenre = async (data: any) => {
  try {
    const existingIds = await MovieGenre.findAll({
      attributes: ["movieGenreId"],
      order: [["movieGenreId", "ASC"]],
    });

    const ids = existingIds.map((mg) => mg.movieGenreId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const existingCodes = await MovieGenre.findAll({
      attributes: ["movieGenreCode"],
      order: [["movieGenreCode", "ASC"]],
    });

    const codes = existingCodes.map((movieGenre) => movieGenre.movieGenreCode);
    let newCode = "MG001";
    if (newId < 10) {
      while (codes.includes(newCode)) {
        newCode = "MG00" + newId;
      }
    } else if (newId >= 10 && newId < 100) {
      while (codes.includes(newCode)) {
        newCode = "MG0" + newId;
      }
    } else {
      while (codes.includes(newCode)) {
        newCode = "MG" + newId;
      }
    }

    const newMovieGenre = await MovieGenre.create({
      movieGenreId: newId,
      movieGenreCode: newCode,
      movieCode: data.movieCode,
      genreCode: data.genreCode,
    });

    return {
      errCode: 0,
      message: "MovieGenre created successfully",
      movieGenre: newMovieGenre,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating MovieGenre: ${error}`,
    };
  }
};

export const deleteMovieGenre = async (movieGenreCode: string) => {
  try {
    const movieGenre = await MovieGenre.findOne({
      where: { movieGenreCode: movieGenreCode },
    });
    if (!movieGenre) {
      return { errCode: 1, message: "MovieGenre not found" };
    } else {
      await movieGenre.destroy();
      return { errCode: 0, message: "MovieGenre deleted successfully" };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting MovieGenre: ${error}`,
    };
  }
};

export const getAllMovieGenres = async () => {
  try {
    const movieGenres = await MovieGenre.findAll();
    return {
      errCode: 0,
      message: "Get all movie genres success",
      movieGenres,
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting movie genres: ${error}`,
    };
  }
};

export const getGenreForMovie = async (movieCode: string) => {
  try {
    const movieGenres = await MovieGenre.findAll({
      where: { movieCode: movieCode },
      attributes: ["movieCode", "genreCode"],
      raw: true,
    });

    if (!movieGenres || movieGenres.length === 0) {
      return {
        errCode: 1,
        message: "MovieGenre not found",
      };
    } else {
      // Sử dụng Promise.all để đợi tất cả các lời gọi getGenreByCode hoàn thành
      const genresMovie = await Promise.all(
        movieGenres.map(async (movieGenre) => {
          const genre = await getGenreByCode(movieGenre.genreCode);
          return genre.genre;
        })
      );
      return {
        errCode: 0,
        message: "Get movie genre success",
        genresMovie,
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting movie genre: ${error}`,
    };
  }
};
