import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../user/models/user.model.js";

export async function authService(req, res) {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);

  if (user === undefined) {
    return res.json({
      error: true,
      success: false,
      message: "Incorrect email or password.",
    });
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    return res.json({
      error: true,
      success: false,
      message: "Incorrect email or password.",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.SECRET_PASS
  );

  res.status(200);
  return res.json({ token });
}
