import User from "../models/user.model.js";

export async function showUserService(req, res) {
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
