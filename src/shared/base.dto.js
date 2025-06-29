import { validationResult } from "express-validator";

class DTO {
  verify(req, res, next) {
    const result = validationResult(req);
    if (result.errors.length > 0) {
      res.json(result);
    } else {
      next();
    }
  }
}

export default new DTO();
