import MovieGenre from "../models/MovieGenre";
import MovieTheater from "../models/MovieTheater";
import { getMovieByCode } from "./movieService";

export const createNewMovieTheater = async (data: any) => {
  try {
    const existingIds = await MovieTheater.findAll({
      attributes: ["movieTheaterId"],
      order: [["movieTheaterId", "ASC"]],
    });

    const ids = existingIds.map((movieTheater) => movieTheater.movieTheaterId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const existingCodes = await MovieTheater.findAll({
      attributes: ["movieTheaterCode"],
      order: [["movieTheaterCode", "ASC"]],
    });

    const codes = existingCodes.map(
      (movieTheater) => movieTheater.movieTheaterCode
    );
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

    const newMovieTheater = await MovieTheater.create({
      movieTheaterId: newId,
      movieTheaterCode: newCode,
      movieCode: data.movieCode,
      theaterCode: data.theaterCode,
    });

    return {
      errCode: 0,
      message: "New movieTheater created successfully",
      movieTheater: newMovieTheater,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating MovieGenre: ${error}`,
    };
  }
};

export const deleteMovieTheater = async (movieTheaterCode: string) => {
  try {
    const movieTheater = await MovieTheater.findOne({
      where: { movieTheaterCode: movieTheaterCode },
    });
    if (!movieTheater) {
      return { errCode: 1, message: "MovieTheater not found" };
    } else {
      await movieTheater.destroy();
      return { errCode: 0, message: "MovieGenre deleted successfully" };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting MovieGenre: ${error}`,
    };
  }
};

export const getAllMovieTheater = async () => {
  try {
    const movieTheater = await MovieTheater.findAll();
    return {
      errCode: 0,
      message: "Get all movie theater success",
      movieTheater,
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting movie Theater: ${error}`,
    };
  }
};

export const getMovieFromThearter = async (theaterCode: string) => {
  try {
    const movieTheaters = await MovieTheater.findAll({
      where: { theaterCode: theaterCode },
      attributes: ["theaterCode", "movieCode"],
      raw: true,
    });

    if (!movieTheaters || movieTheaters.length === 0) {
      return {
        errCode: 1,
        message: "MovieGenre not found",
      };
    } else {
      // Sử dụng Promise.all để đợi tất cả các lời gọi getGenreByCode hoàn thành
      const allMovieTheaters = await Promise.all(
        movieTheaters.map(async (movieTheater) => {
          const movie = await getMovieByCode(movieTheater.movieCode);
          return movie.movie;
        })
      );
      return {
        errCode: 0,
        message: "Get movie genre success",
        allMovieTheaters,
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting movie genre: ${error}`,
    };
  }
};
