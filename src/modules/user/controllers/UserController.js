import express from "express";
import AuthGuard from "../../../guards/AuthGuard.js";
import UserService from "../services/UserService.js";
import { createUserDTO } from "../dtos/CreateUserDTO.js";
import { updateUserDTO } from "../dtos/UpdateUserDTO.js";

const UserController = express.Router();

UserController.get("/user", AuthGuard.verify, UserService.index);

UserController.get("/user/:id", AuthGuard.verify, UserService.show);

UserController.post(
  "/user",
  AuthGuard.verify,
  createUserDTO,
  UserService.store
);

UserController.put(
  "/user/:id",
  AuthGuard.verify,
  updateUserDTO,
  UserService.update
);

UserController.delete("/user/:id", AuthGuard.verify, UserService.destroy);

export default UserController;
