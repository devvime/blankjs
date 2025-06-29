import User from "../models/user.model.js";

export async function listUserService(req, res) {
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
