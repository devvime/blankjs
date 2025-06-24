import User from "./User.js";

class UserService {
  async index(req, res) {
    const users = await User.findAll();
    res.json(users);
  }

  async show(req, res) {
    const user = await User.findById(req.params.id);
    res.json(user);
  }

  async store(req, res) {
    try {
      if ((await User.findByEmail(req.body.email)).length > 0) {
        res.status(409);
        return res.json({
          error: true,
          message: "This email already exists.",
        });
      }

      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      res.json({
        success: true,
        message: "User created successfull!",
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default new UserService();
