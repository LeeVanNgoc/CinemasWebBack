import express from "express";
import userController from "../controllers/userController";
import { Application } from "express-serve-static-core";

const router = express.Router();

const userRoutes = (app: Application) => {
  router.post("/create-new-user", userController.handleCreateUser);
  router.delete("/delete-user", userController.handleDeleteUser);
  router.put("/edit-user", userController.handleEditUser);
  router.get("/get-user-by-code", userController.handleGetUserById);
  router.get("/get-all-users", userController.handleGetAllUsers);
  router.post("/login-user", userController.handleLoginUser);
  router.post("/login-user-with-jwt", userController.handleLoginUserWithJWT);
  router.post("/forgot-password", userController.handleForgotPassword);
  router.post("/login-request-password", userController.handleRequestPasswords);
  return app.use("/api/user", router);
};

export default userRoutes;
