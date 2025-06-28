import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import UserController from "./modules/user/controllers/user.controller.js";
import PasswordRecoveryController from "./modules/passwordRecoveryToken/controllers/password-recovery-token.controller.js";
import AuthController from "./modules/auth/controllers/auth.controller.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(errorMiddleware);

app.use("/", UserController);
app.use("/", PasswordRecoveryController);
app.use("/", AuthController);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port:", process.env.PORT || 3000);
});
