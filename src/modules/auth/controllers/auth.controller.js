import express from "express";
import AuthService from "../services/auth.service.js";
import { authDTO } from "../dtos/auth.dto.js";

const AuthController = express.Router();

AuthController.post("/auth", authDTO, AuthService.auth);

export default AuthController;
