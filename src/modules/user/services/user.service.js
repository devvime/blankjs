import User from "../models/user.model.js";
import bcrypt from "bcrypt";

class UserService {
  async index(req, res) {
    const users = await User.findAll([
      "id",
      "name",
      "email",
      "role",
      "created_at",
      "updated_at",
    ]);
    res.json(users);
  }

  async show(req, res) {
    const user = await User.findById(req.params.id, [
      "id",
      "name",
      "email",
      "role",
      "created_at",
      "updated_at",
    ]);
    if (user === undefined) {
      return res.json({
        status: 404,
        error: true,
        success: false,
        message: "User is not found.",
      });
    }
    res.json(user);
  }

  async store(req, res) {
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
        success: true,
        message: "User created successfull!",
      });
    } catch (err) {
      console.log(err);
    }
  }

  async update(req, res) {
    const userId = req.params.id;
    const data = req.body;
    const user = await User.findById(userId);

    if (user === undefined) {
      return {
        status: 404,
        error: true,
        success: false,
        message: "User is not found!",
      };
    }

    const values = {};
    let emailExists = false;

    if (data.email !== undefined && data.email !== user.email) {
      emailExists = await User.findByEmail(data.email);
      if (emailExists !== undefined) {
        return res.json({
          status: 409,
          error: true,
          success: false,
          message: `This email ${data.email} already exists!`,
        });
      }
      values.email = data.email;
    }
    if (data.name !== undefined) values.name = data.name;

    try {
      await await User.update(userId, values);
      const result = await User.findById(userId);
      return res.json({
        error: false,
        status: 200,
        message: "Successfully edited!",
        data: result,
      });
    } catch (err) {
      return res.json({
        error: true,
        success: false,
        message: `Error: ${err}`,
      });
    }
  }

  async destroy(req, res) {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user === undefined) {
      return res.json({
        error: true,
        success: false,
        status: 404,
        message: "User is not found!",
      });
    }

    try {
      await User.delete(userId);
      return res.json({
        error: false,
        success: true,
        status: 200,
        message: "Successfully deleted!",
      });
    } catch (err) {
      return res.json({
        error: true,
        success: false,
        message: `Error: ${err}`,
      });
    }
  }

  async changePassword(id, newPassword, token) {
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
}

export default new UserService();
