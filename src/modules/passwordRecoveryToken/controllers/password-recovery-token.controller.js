import express from "express";
import PasswordRecoveryTokenService from "../services/password-recovery-token.service.js";
import {
  passwordRecoverTokenDTO,
  passwordRecoveryTokenDTO,
} from "../dtos/password-recovery-token.dto.js";

const PasswordRecoveryController = express.Router();

PasswordRecoveryController.post(
  "/recoveryPassword",
  passwordRecoveryTokenDTO,
  PasswordRecoveryTokenService.recoverPassword
);

PasswordRecoveryController.post(
  "/changePassword/:token",
  passwordRecoverTokenDTO,
  PasswordRecoveryTokenService.changePassword
);

export default PasswordRecoveryController;
