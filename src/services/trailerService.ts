import Trailer from "../models/Trailer";

export const createTrailer = async (data: any) => {
  try {
    const existingIds = await Trailer.findAll({
      attributes: ["trailerId"],
      order: [["trailerId", "ASC"]],
    });

    const ids = existingIds.map((Trailer) => Trailer.trailerId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const existingCodes = await Trailer.findAll({
      attributes: ["trailerCode"],
      order: [["trailerCode", "ASC"]],
    });

    const codes = existingCodes.map((trailer) => trailer.trailerCode);
    let newCode = "TL001";
    if (newId < 10) {
      while (codes.includes(newCode)) {
        newCode = "TL00" + newId;
      }
    } else if (newId >= 10 && newId < 100) {
      while (codes.includes(newCode)) {
        newCode = "TL0" + newId;
      }
    } else {
      while (codes.includes(newCode)) {
        newCode = "TL" + newId;
      }
    }
    const newTrailer = await Trailer.create({
      trailerId: newId,
      trailerCode: newCode,
      movieCode: data.movieCode,
      link: data.link,
    });
    return {
      newTrailer,
      errCode: 0,
      message: "Trailer created successfully",
    };
  } catch (error) {
    return {
      message: `Create false by error: ${error}`,
    };
  }
};

export const getTrailerByCode = async (trailerCode: string) => {
  try {
    const trailer = await Trailer.findOne({
      where: { trailerCode: trailerCode },
      raw: true,
    });

    if (!trailer) {
      return {
        errCode: 1,
        message: "Trailer not found",
      };
    }
    return {
      trailer,
      errCode: 0,
      message: "Trailer fetched successfully",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting trailer by code: ${error}`,
    };
  }
};

export const getTrailerByMovieCode = async (movieCode: string) => {
  try {
    const trailer = await Trailer.findAll({
      where: { movieCode: movieCode },
      raw: true,
    });

    if (!trailer) {
      return {
        errCode: 1,
        message: "Trailer not found",
      };
    }
    return {
      trailer,
      errCode: 0,
      message: "Trailer fetched successfully",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting trailer by id: ${error}`,
    };
  }
};

export const getAllTrailer = async () => {
  try {
    const trailers = await Trailer.findAll({
      attributes: ["trailerCode", "movieCode", "link"],
      raw: true,
    });

    if (!trailers) {
      return {
        trailers: null,
        errCode: 1,
        message: "No trailers found",
      };
    }
    return {
      trailers,
      errCode: 0,
      message: "All trailers fetched successfully",
    };
  } catch (error) {
    return {
      trailers: null,
      errCode: 3,
      message: `Error getting all trailers: ${error}`,
    };
  }
};

export const deleteTrailer = async (trailerCode: string) => {
  try {
    const trailer = await Trailer.findOne({
      where: { trailerCode: trailerCode },
      raw: true,
    });
    if (!trailer) {
      return {
        errCode: 1,
        message: "Trailer not found",
      };
    }

    const deletedCount = await Trailer.destroy({
      where: {
        trailerId: trailer.trailerId,
      },
    });
    return {
      errCode: 0,
      message: `Deleted ${deletedCount} trailers`,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting trailer by code: ${error}`,
    };
  }
};

export const updateTrailer = async (data: any) => {
  const trailerCode = data.trailerCode;
  try {
    if (!trailerCode) {
      return {
        errCode: 2,
        message: "Missing required parameters!",
      };
    }
    const trailer = await Trailer.findOne({
      where: { trailerCode: trailerCode },
    });
    if (!trailer) {
      return {
        errCode: 1,
        message: "Trailer not found",
      };
    }
    trailer.movieCode = data.movieCode || trailer.movieCode;
    trailer.link = data.link || trailer.link;
    await trailer.save();
    return {
      trailer,
      errCode: 0,
      message: "Trailer updated successfully",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error updating trailer by code: ${error}`,
    };
  }
};
