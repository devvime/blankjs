import express from "express";
import PasswordRecoveryTokenService from "../services/PasswordRecoveryTokenService.js";
import {
  passwordRecoverTokenDTO,
  passwordRecoveryTokenDTO,
} from "../dtos/PasswordRecoveryTokenDTO.js";

const PasswordRecoveryPasswordController = express.Router();

PasswordRecoveryPasswordController.post(
  "/recoveryPassword",
  passwordRecoveryTokenDTO,
  PasswordRecoveryTokenService.recoverPassword
);

PasswordRecoveryPasswordController.post(
  "/changePassword/:token",
  passwordRecoverTokenDTO,
  PasswordRecoveryTokenService.changePassword
);

export default PasswordRecoveryPasswordController;
