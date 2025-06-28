import express from "express";
import AuthService from "../services/AuthService.js";
import { authDTO } from "../dtos/AuthDTO.js";

const AuthController = express.Router();

AuthController.post("/auth", authDTO, AuthService.auth);

export default AuthController;
