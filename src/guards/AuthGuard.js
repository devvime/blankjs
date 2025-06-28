import jwt from "jsonwebtoken";

class AuthGuard {
  verify(req, res, next) {
    const authToken = req.headers["authorization"];

    if (authToken === undefined) {
      unauthorized(res);
      return;
    }

    const bearer = authToken.split(" ");
    const token = bearer[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_PASS);
      if (decoded.role === 1) {
        next();
      } else {
        unauthorized(res);
      }
    } catch (err) {
      unauthorized(res);
      return;
    }
  }
}

function unauthorized(res) {
  res.status(401);
  res.json({
    status: 401,
    error: true,
    success: false,
    message: "Unauthorized: Access danied!",
  });
}

export default new AuthGuard();
