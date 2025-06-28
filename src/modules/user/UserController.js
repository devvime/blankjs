import express from "express";
import { body } from "express-validator";
import AuthGuard from "../../guards/AuthGuard.js";
import UserService from "./UserService.js";
import UserDTO from "./UserDTO.js";

const UserController = express.Router();

UserController.get("/user", AuthGuard.verify, UserService.index);

UserController.get("/user/:id", AuthGuard.verify, UserService.show);

UserController.post(
  "/user",
  AuthGuard.verify,
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").notEmpty(),
  body("role").isEmpty(),
  UserDTO.verify,
  UserService.store
);

UserController.put(
  "/user/:id",
  AuthGuard.verify,
  body("name").optional(),
  body("email").isEmail().optional(),
  body("password").isEmpty(),
  body("role").isEmpty(),
  UserDTO.verify,
  UserService.update
);

UserController.delete("/user/:id", AuthGuard.verify, UserService.destroy);

export default UserController;
