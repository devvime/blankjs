import express from "express";
import {
  passwordRecoverTokenDTO,
  passwordRecoveryTokenDTO,
} from "../dtos/password-recovery-token.dto.js";
import { recoverPasswordService } from "../services/recover-password.service.js";
import { changePasswordService } from "../services/change-password.service.js";

const PasswordRecoveryController = express.Router();

PasswordRecoveryController.post(
  "/recoveryPassword",
  passwordRecoveryTokenDTO,
  recoverPasswordService
);

PasswordRecoveryController.post(
  "/changePassword/:token",
  passwordRecoverTokenDTO,
  changePasswordService
);

export default PasswordRecoveryController;
