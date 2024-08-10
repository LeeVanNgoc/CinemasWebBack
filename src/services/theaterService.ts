import { threadId } from "worker_threads";
import Theater from "../models/Theater";

// Create a new theater
export const createTheater = async (data: any) => {
  try {
    const existingIds = await Theater.findAll({
      attributes: ["theaterId"],
      order: [["theaterId", "ASC"]],
    });

    const ids = existingIds.map((theater) => theater.theaterId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const existingCodes = await Theater.findAll({
      attributes: ["theaterCode"],
      order: [["theaterCode", "ASC"]],
    });

    const codes = existingCodes.map((theater) => theater.theaterCode);
    let newCode = "R001";
    if (newId < 10) {
      while (codes.includes(newCode)) {
        newCode = "R00" + newId;
      }
    } else if (newId >= 10 && newId < 100) {
      while (codes.includes(newCode)) {
        newCode = "R0" + newId;
      }
    } else {
      while (codes.includes(newCode)) {
        newCode = "R" + newId;
      }
    }
    const newTheater = await Theater.create({
      threadId: newId,
      theaterCode: newCode,
      name: data.name,
      address: data.address,
      city: data.city,
    });
    return {
      newTheater,
      errCode: 0,
      message: "Create theater successfuly",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error create new theater ${error}`,
    };
  }
};

// Get all theaters
export const getAllTheaters = async () => {
  try {
    const theaters = await Theater.findAll();
    return {
      theaters,
      errCode: 0,
      message: "Get all theaters successfuly",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error get all theaters ${error}`,
    };
  }
};

// Get a specific theater
export const getTheaterById = async (theaterID: number) => {
  try {
    const theater = await Theater.findByPk(theaterID);
    if (!theater) {
      return {
        errCode: 1,
        message: "Theater not found",
      };
    }
    return {
      theater,
      errCode: 0,
      message: "Get theater successfuly",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error get theater by id ${error}`,
    };
  }
};

// Get theaters by city
export const getTheatersByCity = async (city: string) => {
  try {
    const theaters = await Theater.findAll({ where: { city } });
    if (!theaters.length) {
      return {
        errCode: 1,
        message: "No theaters found in this city",
      };
    }
    return {
      theaters,
      errCode: 0,
      message: "Get theaters successfuly",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error get theaters by city ${error}`,
    };
  }
};

// Update a specific theater
export const updateTheater = async (data: any) => {
  try {
    const theater = await Theater.findOne({
      where: { theaterId: data.theaterId },
    });
    if (!theater) {
      return {
        errCode: 1,
        message: "Theater not found",
      };
    }
    theater.name = data.name || theater.name;
    theater.address = data.address || theater.address;
    await theater.save();
    return {
      theater,
      errCode: 0,
      message: "Update theater successfuly",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error update theater by id ${error}`,
    };
  }
};

// Delete a specific theater
export const deleteTheater = async (id: number) => {
  try {
    const theater = await Theater.findByPk(id);
    if (!theater) {
      return {
        errCode: 1,
        message: "Theater not found",
      };
    }
    await theater.destroy();
    return {
      errCode: 0,
      message: "Delete theater successfuly",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error delete theater by id ${error}`,
    };
  }
};

// Get theaterCode by theaterId
export const getTheaterCodeById = async (theaterId: number) => {
  try {
    const theater = await Theater.findOne({
      where: { theaterId: theaterId },
      attributes: ["theaterCode"],
      raw: true,
    });
    if (!theater) {
      return {
        errCode: 1,
        message: "Theater not found",
      };
    }
    return {
      theaterCode: theater.theaterCode,
      errCode: 0,
      message: "Get theaterCode successfuly",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error get theaterCode by id ${error}`,
    };
  }
};
