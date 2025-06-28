import User from "../../user/models/User.js";
import PasswordRevoceryToken from "../models/PasswordRevoceryToken.js";

class PasswordRecoveryTokenService {
  async recoverPassword(req, res) {
    const email = req.body.email;
    const result = await PasswordRecoveryToken.create(email);
    if (result.success) {
      res.status(406);
      res.json(result);
    } else {
      res.json(result);
    }
  }

  async changePassword(req, res) {
    const token = req.params.token;
    const password = req.body.password;
    const isValidToken = await PasswordRevoceryToken.validate(token);

    if (isValidToken.success) {
      await User.changePassword(
        isValidToken.data.user_id,
        password,
        isValidToken.data.token
      );
      await PasswordRecoveryToken.invalidate(token);
      res.json(isValidToken);
    } else {
      res.json(isValidToken);
    }
  }
}

export default new PasswordRecoveryTokenService();
