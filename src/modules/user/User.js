import database from "../../database/database.js";
import bcrypt from "bcrypt";

class User {
  table = "users";

  async findAll(
    fields = ["id", "name", "email", "role", "created_at", "updated_at"],
    where = {}
  ) {
    try {
      return await database.select(fields).table(this.table).where(where);
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
      return await database.select(fields).table(this.table).where({ id });
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async findByEmail(email) {
    try {
      return await database.select("*").from(this.table).where({ email });
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
        .table(this.table);
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, data = {}) {
    const user = await this.findById(id);

    if (user === undefined) {
      return {
        status: 404,
        error: true,
        message: "User is not found!",
      };
    }

    const values = {};
    let emailExists = false;

    if (data.email !== undefined && data.email !== user.email) {
      emailExists = await this.findByEmail(data.email);
      if (emailExists.length > 0) {
        return {
          status: 409,
          error: true,
          message: `This email ${data.email} already exists!`,
        };
      }
      values.email = data.email;
    }
    if (data.name !== undefined) values.name = data.name;

    try {
      await database.update(values).where({ id }).table(this.table);
      const result = await this.findById(id);
      return {
        error: false,
        status: 200,
        message: "Successfully edited!",
        data: result,
      };
    } catch (err) {
      return {
        error: true,
        message: err,
      };
    }
  }

  async destory(id) {
    const user = await this.findById(id);
    if (user.length === 0) {
      return {
        error: true,
        status: 404,
        message: "User is not found!",
      };
    }

    try {
      await database.delete().where({ id }).table(this.table);
      return {
        error: false,
        status: 200,
        message: "Successfully deleted!",
      };
    } catch (err) {
      return {
        error: true,
        message: err,
      };
    }
  }

  async changePassword(id, newPassword, token) {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    try {
      await database
        .update({ password: passwordHash })
        .where({ id })
        .table(this.table);

      return {
        error: false,
        success: true,
        message: "Password updated successfully!",
      };
    } catch (err) {
      return {
        error: true,
        success: false,
        message: err,
      };
    }
  }
}

export default new User();
