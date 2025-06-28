import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import UserController from "./modules/user/UserController.js";
import PasswordRecoveryPasswordController from "./modules/passwordRecoveryToken/PasswordRecoveryTokenController.js";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", UserController);
app.use("/", PasswordRecoveryPasswordController);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port:", process.env.PORT || 3000);
});
