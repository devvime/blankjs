import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export async function createUserService(req, res) {
  try {
    if ((await User.findByEmail(req.body.email)) !== undefined) {
      res.status(409);
      return res.json({
        error: true,
        success: false,
        message: "This email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
      role: 0,
    });

    res.json({
      error: false,
      success: true,
      message: "User created successfull!",
    });
  } catch (err) {
    res.json({
      error: true,
      success: false,
      message: `Error: ${err}`,
    });
    console.log(err);
  }
}
