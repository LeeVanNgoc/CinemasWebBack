import  express  from "express";
import theaterController from "../controllers/theaterController";
import { Application } from "express";

const router = express.Router();

const theaterRoutes = (app: Application) => {
	router.post("/create-theater", theaterController.handleCreateTheater);
	router.get("/get-theater", theaterController.handleGetAllTheaters);
	router.put("/edit-theater", theaterController.handleUpdateTheater);
	router.delete("/delete-theater", theaterController.handleDeleteTheater);
	router.get("/get-theaters-by-id", theaterController.handleGetTheaterById);
	router.get("/get-theaters-by-city", theaterController.handleGetTheaterById);

	app.use("/api/theater", router);
}

export default theaterRoutes;