import User from "../models/user.model.js";

export async function deleteUserService(req, res) {
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
