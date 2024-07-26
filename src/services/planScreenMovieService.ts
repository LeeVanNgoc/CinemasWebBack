import PlanScreenMovie from '../models/PlanScreenMovie';

export const createPlanScreenMovie = async (data: any) => {
  try {
    const existingIds = await PlanScreenMovie.findAll({
      attributes: ['psmId'],
      order: [['psmId', 'ASC']]
    });

    const ids = existingIds.map(psm => psm.psmId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const newPlanScreenMovie = await PlanScreenMovie.create({
      psmId: newId,
      roomId: data.roomId,
      movieId: data.movieId,
      startTime: data.startTime,
      endTime: data.endTime,
      space: data.space,
    });

    return {
      errCode: 0,
      message: 'PlanScreenMovie created successfully',
      planScreenMovie: newPlanScreenMovie
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating PlanScreenMovie: ${error}`
    };
  }
};

export const deletePlanScreenMovie = async (psmId: number) => {
  try {
    const planScreenMovie = await PlanScreenMovie.findOne({ where: { psmId } });
    if (!planScreenMovie) {
      return { errCode: 1, message: "PlanScreenMovie not found" };
    } else {
      await planScreenMovie.destroy();
      return { errCode: 0, message: "PlanScreenMovie deleted successfully" };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting PlanScreenMovie: ${error}`
    };
  }
};

export const editPlanScreenMovie = async (data: any) => {
  const psmId = data.psmId;
  try {
    if (!psmId) {
      return { errCode: 4, message: 'Missing required parameters!' };
    }

    const planScreenMovie = await PlanScreenMovie.findOne({ where: { psmId } });
    if (!planScreenMovie) {
      return { errCode: 1, message: 'PlanScreenMovie not found!' };
    }

    Object.assign(planScreenMovie, data);
    await planScreenMovie.save();

    return { 
      errCode: 0,
      message: 'Update the PlanScreenMovie succeeds!',
      planScreenMovie
    };
  } catch (error) {
    return {
      errCode: 2,
      message: `Error updating PlanScreenMovie: ${error}`
    };
  }
};

export const getAllPlanScreenMovies = async () => {
  try {
    const planScreenMovies = await PlanScreenMovie.findAll();
    return {
      errCode: 0,
      message: 'Get all PlanScreenMovies success',
      planScreenMovies
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting PlanScreenMovies: ${error}`
    };
  }
};

export const getPlanScreenMovieById = async (psmId: number) => {
  try {
    const planScreenMovie = await PlanScreenMovie.findOne({ where: { psmId } });
    if (!planScreenMovie) {
      return {
        errCode: 1,
        message: 'PlanScreenMovie not found'
      };
    }
    return {
      errCode: 0,
      message: 'Get PlanScreenMovie success',
      planScreenMovie
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting PlanScreenMovie: ${error}`
    };
  }
};
