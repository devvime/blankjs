import { validationResult } from "express-validator";

class UserDTO {
  verify(req, res, next) {
    const result = validationResult(req);
    if (result.errors.length > 0) {
      res.json(result);
    } else {
      next();
    }
  }
}

export default new UserDTO();
