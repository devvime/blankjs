import database from "../../../database/database.js";
import BaseModel from "../../../shared/base.model.js";

class PasswordRecoveryToken extends BaseModel {
  table = "passwordTokens";

  async validate(token) {
    return await database.select().where({ token }).table(this.table).first();
  }

  async invalidate(token) {
    return await database
      .update({ is_valid: 0 })
      .where({ token })
      .table(this.table);
  }
}

export default new PasswordRecoveryToken();
