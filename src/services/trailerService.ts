import Trailer from "../models/Trailer";

export const createTrailer = async(data : any) => {
	try {
        const existingIds = await Trailer.findAll({
            attributes: ['trailerId'],
            order: [['trailerId', 'ASC']]
        });

        const ids = existingIds.map(Trailer => Trailer.trailerId);

        let newId = 1;
        while (ids.includes(newId)) {
            newId++;
        }
        const newTrailer = await Trailer.create({
            trailerId: newId,
            movieId: data.movieId,
            link: data.link,
        });
        return {
			newTrailer,
			errCode : 0,
			message : "Trailer created successfully",
        };
    } catch (error) {
        return {
            message : `Create false by error: ${error}`,
        };
    }
}

export const getTrailerById = async(trailerId : number) => {
    try {
        const trailer = await Trailer.findOne({
            where: {trailerId: trailerId},
            raw: true,
        })

        if (!trailer) {
            return {
                errCode: 1,
                message: "Trailer not found",
            }
        }
        return {
            trailer,
            errCode: 0,
            message: "Trailer fetched successfully",
        }
    } catch (error) {
        return {
            errCode: 3, 
            message: `Error getting trailer by id: ${error}`,
        }
    }
}

export const getTrailerByMovieId = async(movieId : number) => {
    try {
        const trailer = await Trailer.findAll({
            where: {movieId: movieId},
            raw: true,
        })

        if (!trailer) {
            return {
                errCode: 1,
                message: "Trailer not found",
            }
        }
        return {
            trailer,
            errCode: 0,
            message: "Trailer fetched successfully",
        }
    } catch (error) {
        return {
            errCode: 3, 
            message: `Error getting trailer by id: ${error}`,
        }
    }
}

export const getAllTrailer = async () => {
    try {
        const trailers = await Trailer.findAll({
            attributes: ['trailerId', 'movieId', 'link'],
            raw: true,
        });
        
        if(!trailers) {
            return {
                trailers: null,
                errCode: 1,
                message: "No trailers found",
            }
        }
        return {
            trailers,
            errCode: 0,
            message: "All trailers fetched successfully",
        }
    } catch (error) {
        return {
            trailers: null,
            errCode: 3,
            message: `Error getting all trailers: ${error}`,
        }
    }
}

export const deleteTrailer = async(trailerId : number) => {
    try {
        const trailer = await Trailer.findOne({
            where: {trailerId: trailerId},
            raw: true,
        })
        if (!trailer) {
            return {
                errCode: 1,
                message: "Trailer not found",
            }
        }

        const deletedCount = await Trailer.destroy({
            where: {
                trailerId: trailer.trailerId,
            },
        });
        return {
            errCode: 0,
            message: `Deleted ${deletedCount} trailers`,
        }
    } catch (error) {
        return {
            errCode: 3,
            message: `Error deleting trailer by id: ${error}`,
        }
    }
}

export const updateTrailer = async(data : any) => {
    const trailerId = data.trailerId
    try {
        if (!trailerId) {
            return {
                errCode: 2,
                message: "Missing required parameters!",
            }
        }
        const trailer = await Trailer.findOne({
            where: {trailerId: trailerId},
        })
        if (!trailer) {
            return {
                errCode: 1,
                message: "Trailer not found",
            }
        }
        trailer.movieId = data.movieId || trailer.movieId;
        trailer.link = data.link || trailer.link;
        await trailer.save();
        return {
            trailer,
            errCode: 0,
            message: "Trailer updated successfully",
        }
        
    } catch (error) {
        return {
            errCode: 3,
            message: `Error updating trailer by id: ${error}`,
        }
    }
}