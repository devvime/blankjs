import DTO from "../../../shared/base.dto.js";
import { body } from "express-validator";

export const authDTO = [
  body("email").isEmail().notEmpty(),
  body("password").notEmpty(),
  DTO.verify,
];
