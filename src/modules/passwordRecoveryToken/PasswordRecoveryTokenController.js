import express from "express";
import { body } from "express-validator";

import PasswordRecoveryTokenService from "./PasswordRecoveryTokenService.js";
import PasswordRecoveryTokenDTO from "./PasswordRecoveryTokenDTO.js";

const PasswordRecoveryPasswordController = express.Router();

PasswordRecoveryPasswordController.post(
  "/recoveryPassword",
  body("email").isEmail(),
  body("email").notEmpty(),
  PasswordRecoveryTokenDTO.verify,
  PasswordRecoveryTokenService.recoverPassword
);

PasswordRecoveryPasswordController.post(
  "/changePassword/:token",
  body("password").notEmpty(),
  PasswordRecoveryTokenDTO.verify,
  PasswordRecoveryTokenService.changePassword
);

export default PasswordRecoveryPasswordController;
