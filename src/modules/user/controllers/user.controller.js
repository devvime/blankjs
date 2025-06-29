import express from "express";
import AuthGuard from "../../../guards/auth.guard.js";
import { createUserDTO } from "../dtos/create-user.dto.js";
import { updateUserDTO } from "../dtos/update-user.dto.js";
import { listUserService } from "../services/list-user.service.js";
import { showUserService } from "../services/show-user.service.js";
import { createUserService } from "../services/create-user.service.js";
import { updateUserService } from "../services/update-user.service.js";
import { deleteUserService } from "../services/delete-user.service.js";

const UserController = express.Router();

UserController.get("/user", AuthGuard.verify, listUserService);

UserController.get("/user/:id", AuthGuard.verify, showUserService);

UserController.post(
  "/user",
  AuthGuard.verify,
  createUserDTO,
  createUserService
);

UserController.put(
  "/user/:id",
  AuthGuard.verify,
  updateUserDTO,
  updateUserService
);

UserController.delete("/user/:id", AuthGuard.verify, deleteUserService);

export default UserController;
