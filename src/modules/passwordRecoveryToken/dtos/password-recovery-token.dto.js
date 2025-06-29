import DTO from "../../../shared/base.dto.js";
import { body } from "express-validator";

export const passwordRecoveryTokenDTO = [
  body("email").isEmail(),
  body("email").notEmpty(),
  DTO.verify,
];

export const passwordRecoverTokenDTO = [
  body("password").notEmpty(),
  DTO.verify,
];
