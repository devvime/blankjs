import User from "../models/user.model.js";

export async function updateUserService(req, res) {
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
    const result = await User.findById(userId, [
      "id",
      "name",
      "email",
      "role",
      "created_at",
      "updated_at",
    ]);
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
