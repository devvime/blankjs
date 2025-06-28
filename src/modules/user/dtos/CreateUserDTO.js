import DTO from "../../../shared/DTO.js";
import { body } from "express-validator";

export const createUserDTO = [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").notEmpty(),
  body("role").custom((value, { req }) => {
    if (value) throw new Error("You cannot set the function manually.");
    return true;
  }),
  DTO.verify,
];
