import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export async function changeUserPasswordService(id, newPassword, token) {
  const passwordHash = await bcrypt.hash(newPassword, 10);
  try {
    await User.update(id, { password: passwordHash });
    return {
      error: false,
      success: true,
      message: "Password updated successfully!",
    };
  } catch (err) {
    return {
      error: true,
      success: false,
      message: `Error: ${err}`,
    };
  }
}
