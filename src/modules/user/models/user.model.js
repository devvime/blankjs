import BaseModel from "../../../shared/base.model.js";

class User extends BaseModel {
  table = "users";
}

export default new User();
