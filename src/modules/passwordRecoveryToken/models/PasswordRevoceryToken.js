import database from "../../../database/database.js";
import User from "../../user/models/User.js";

class PasswordRecoveryToken {
  table = "passwordTokens";

  async create(email) {
    const user = await User.findByEmail(email);

    if (user === undefined || user.length === 0) {
      return {
        error: true,
        success: false,
        message: "User is not found.",
      };
    }

    try {
      const token = Date.now();

      await database
        .insert({
          user_id: user.shift().id,
          is_valid: 1,
          token: token,
        })
        .table(this.table);

      return {
        error: false,
        success: true,
        message: "Password recovery token created successfully.",
      };
    } catch (err) {
      return {
        error: true,
        success: false,
        message: err,
      };
    }
  }

  async validate(token) {
    try {
      const result = await database.select().where({ token }).table(this.table);

      if (result.length === 0) {
        return {
          error: true,
          success: false,
          message: "Token is invalid.",
        };
      }

      const tk = result[0];

      if (tk.is_valid) {
        return {
          error: false,
          success: true,
          message: "Token is valid!",
          data: tk,
        };
      } else {
        return {
          error: true,
          success: false,
          message: "Token is invalid.",
        };
      }
    } catch (err) {
      return {
        error: true,
        success: false,
        message: err,
      };
    }
  }

  async invalidate(token) {
    await database.update({ is_valid: 0 }).where({ token }).table(this.table);
  }
}

export default new PasswordRecoveryToken();
