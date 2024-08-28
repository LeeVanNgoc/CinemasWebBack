import express from "express";
import roomController from "../controllers/roomController";
import { Application } from "express-serve-static-core";

const router = express.Router();

const roomRoutes = (app: Application) => {
  router.post("/create-new-room", roomController.handleCreateRoom);
  router.delete("/delete-room", roomController.handleDeleteRoom);
  router.put("/edit-room", roomController.handleEditRoom);
  router.get("/get-all-rooms", roomController.handleGetAllRooms);
  router.get("/get-room-by-code", roomController.handleGetRoomByCode);
  router.get("/get-room-in-theater", roomController.handleGetRoomInTheater);
  router.get(
    "/update-number-seat-in-room",
    roomController.handleUpdateNumberSeatInRoom
  );
  router.get(
    "/get-list-room-information",
    roomController.handleGetListRoomInformation
  );
  router.get("/get-all-room-codes", roomController.handleGetAllRoomCodes);
  router.get(
    "/get-all-room-codes-in-theater",
    roomController.handleGetAllRoomCodesInTheater
  );
  return app.use("/api/room", router);
};

export default roomRoutes;
