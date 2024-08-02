import exp from 'constants';
import PlanScreenMovie from '../models/PlanScreenMovie';
import { numberSeatInRoom } from './seatsService';

export const createPlanScreenMovie = async (data: any) => {
  try { 
    const existingIds = await PlanScreenMovie.findAll({
      attributes: ['planScreenMovieId'],
      order: [['planScreenMovieId', 'ASC']]
    });

    const ids = existingIds.map(psm => psm.planScreenMovieId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const newPlanScreenMovie = await PlanScreenMovie.create({
      planScreenMovieId: newId,
      roomId: data.roomId,
      movieId: data.movieId,
      startTime: data.startTime,
      endTime: data.endTime,
      dateScreen: data.dateScreen,
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

export const deletePlanScreenMovie = async (planScreenMovieId: number) => {
  try {
    const planScreenMovie = await PlanScreenMovie.findOne({ where: { planScreenMovieId } });
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
  const planScreenMovieId = data.planScreenMovieId;
  try {
    if (!planScreenMovieId) {
      return { errCode: 4, message: 'Missing required parameters!' };
    }

    const planScreenMovie = await PlanScreenMovie.findOne({ where: { planScreenMovieId } });
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

export const getPlanScreenMovieById = async (planScreenMovieId: number) => {
  try {
    const planScreenMovie = await PlanScreenMovie.findOne({ where: { planScreenMovieId } });
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

export const createPlanScreenMovieWithMovie = async(data : any) => {
  try {
    const numberSeat = await numberSeatInRoom(data.roomId);
    const existingIds = await PlanScreenMovie.findAll({
      attributes: ['planScreenMovieId'],
      order: [['planScreenMovieId', 'ASC']]
    });

    const ids = existingIds.map(psm => psm.planScreenMovieId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }
    const newPlanScreen = await PlanScreenMovie.create({
      planScreenMovieId: newId,
      roomId: data.roomId,
      movieId: data.movieId,
      startTime: data.startTime,
      endTime: data.endTime,
      dateScreen: data.dateScreen,
      space: numberSeat.numberSeat,
    });
  if (newPlanScreen) {
    return {
      errCode: 0,
      message: 'PlanScreenMovie created successfully',
      planScreenMovie: newPlanScreen
    };
  } else {
    return {
      errCode: 1,
      message: 'Failed to create PlanScreenMovie',
    };
  }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating PlanScreenMovie: ${error}`
    }
  }
}

// export const createPlanScreenMovieWithMovie = async(data : any) => {
//   try {
//     const numberSeat = await numberSeatInRoom(data.roomId);
//     const existingIds = await PlanScreenMovie.findAll({
//       attributes: ['planScreenMovieId'],
//       order: [['planScreenMovieId', 'ASC']]
//     });

//     const ids = existingIds.map(psm => psm.planScreenMovieId);

//     let newId = 1;
//     while (ids.includes(newId)) {
//       newId++;
//     }
//     const newPlanScreenMovie = [];
//     const lengthNumberSeat = Number(numberSeat.numberSeat)
//     if (lengthNumberSeat > 0) {
//       for (let index = 0; index < lengthNumberSeat; index++) {
//         const newPlanScreen = await PlanScreenMovie.create({
//           planScreenMovieId: newId,
//           roomId: data.roomId,
//           movieId: data.movieId,
//           startTime: data.startTime,
//           endTime: data.endTime,
//           space: data.space,
//         });
//         newPlanScreenMovie.push(newPlanScreen);
//         newId++;
//       } 
//       if (newPlanScreenMovie.length > 1) {
//         return {
//         errCode: 0,
//         message: 'PlanScreenMovie created successfully',
//         planScreenMovie: newPlanScreenMovie
//       };
//       } else {
//         return {
//           errCode: 1,
//           message: 'Failed to create PlanScreenMovie',
//         };
//       }
//     } else {
//       return {
//         errCode: 2,
//         message: 'Number of seat in room not available',
//       };
//     }
//   } catch (error) {
//     return {
//       errCode: 3,
//       message: `Error creating PlanScreenMovie: ${error}`
//     }
//   }
// }