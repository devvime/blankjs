import database from "../../database/database.js";
import bcrypt from "bcrypt";

class User {
  async findAll(
    fields = ["id", "name", "email", "role", "created_at", "updated_at"],
    where = {}
  ) {
    try {
      return await database.select(fields).table("users").where(where);
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async findById(
    id,
    fields = ["id", "name", "email", "role", "created_at", "updated_at"]
  ) {
    try {
      return await database.select(fields).table("users").where({ id });
    } catch (err) {
      console.log(err);
      return [];
    }
  }

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
