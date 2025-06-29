import User from "../../user/models/user.model.js";
import PasswordRecoveryToken from "../models/password-recovery-token.model.js";

export async function recoverPasswordService(req, res) {
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
