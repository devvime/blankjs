import express from "express";
import { authService } from "../services/auth.service.js";
import { authDTO } from "../dtos/auth.dto.js";

const AuthController = express.Router();

AuthController.post("/auth", authDTO, authService);

export default AuthController;
