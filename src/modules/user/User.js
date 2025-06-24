import database from "../../database/database.js";
import bcrypt from "bcrypt";

class User {
  async create(data = {}) {
    try {
      const passwordHash = await bcrypt.hash(data.password, 10);
      await database
        .insert({
          name: data.name,
          email: data.email,
          password: passwordHash,
          role: 0,
        })
        .table("users");
    } catch (err) {
      console.log(err);
    }
  }

  async findByEmail(email) {
    try {
      return await database.select("*").from("users").where({ email });
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}

export default new User();
