import express from "express";
import { body } from "express-validator";
import AuthService from "./AuthService.js";
import AuthDTO from "./AuthDTO.js";

const AuthController = express.Router();

AuthController.post(
  "/auth",
  body("email").isEmail().notEmpty(),
  body("password").notEmpty(),
  AuthDTO.verify,
  AuthService.auth
);

export default AuthController;
