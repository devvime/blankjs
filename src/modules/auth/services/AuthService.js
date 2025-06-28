import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../user/models/User.js";

class AuthService {
  async auth(req, res) {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (user === undefined || user.length === 0) {
      return res.json({
        error: true,
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const result = await bcrypt.compare(password, user[0].password);

    if (!result) {
      return res.json({
        error: true,
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
      },
      process.env.SECRET_PASS
    );

    res.status(200);
    return res.json({ token });
  }
}

export default new AuthService();
