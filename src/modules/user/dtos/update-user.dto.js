import DTO from "../../../shared/DTO.js";
import { body } from "express-validator";

export const updateUserDTO = [
  body("name").optional(),
  body("email").isEmail().optional(),
  body("password").isEmpty(),
  body("role").custom((value, { req }) => {
    if (value) throw new Error("You cannot set the function manually.");
    return true;
  }),
  DTO.verify,
];
