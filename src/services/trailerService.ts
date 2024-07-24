import { error } from "console";
import Trailer from "../models/Trailer";

export const createTrailer = async(data : any) => {
	try {
        const newTrailer = await Trailer.create({
            trailerId: data.trailerId,
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

