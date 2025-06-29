import PasswordRecoveryToken from "../models/password-recovery-token.model.js";
import { changeUserPasswordService } from "../../user/services/change-password.service.js";

export async function changePasswordService(req, res) {
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

    await changeUserPasswordService(result.user_id, password, result.token);
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
