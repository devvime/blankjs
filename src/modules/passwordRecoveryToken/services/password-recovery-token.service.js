import userService from "../../user/services/user.service.js";
import User from "../../user/models/user.model.js";
import PasswordRecoveryToken from "../models/password-recovery-token.model.js";

class PasswordRecoveryTokenService {
  async recoverPassword(req, res) {
    const email = req.body.email;
    const user = await User.findByEmail(email);

    if (user === undefined) {
      return res.json({
        error: true,
        success: false,
        message: "User is not found.",
      });
    }

    try {
      const token = Date.now();

      await PasswordRecoveryToken.create({
        user_id: user.id,
        is_valid: 1,
        token: token,
      });

      return res.json({
        error: false,
        success: true,
        message: "Password recovery token created successfully.",
      });
    } catch (err) {
      return res.json({
        error: true,
        success: false,
        message: `Error: ${err}`,
      });
    }
  }

  async changePassword(req, res) {
    const token = req.params.token;
    const password = req.body.password;

    try {
      const result = await PasswordRecoveryToken.validate(token);

      if (result === undefined || !result.is_valid) {
        return res.json({
          error: true,
          success: false,
          message: "Token is invalid.",
        });
      }

      await userService.changePassword(result.user_id, password, result.token);
      await PasswordRecoveryToken.invalidate(result.token);
      res.json({
        error: false,
        success: true,
        message: "Password updated successfully.",
      });
    } catch (err) {
      return {
        error: true,
        success: false,
        message: `Error: ${err}`,
      };
    }
  }
}

export default new PasswordRecoveryTokenService();
