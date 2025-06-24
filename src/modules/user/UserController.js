import express from "express";
import { body } from "express-validator";

import UserService from "./UserService.js";
import UserDTO from "./UserDTO.js";

const UserController = express.Router();

UserController.get("/user", UserService.index);

UserController.get("/user/:id", UserService.show);

UserController.post(
  "/user",
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").notEmpty(),
  body("role").isEmpty(),
  UserDTO.verify,
  UserService.store
);

export default UserController;
