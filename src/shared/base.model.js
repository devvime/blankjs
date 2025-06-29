import database from "../database/database.js";

export default class BaseModel {
  table = "";

  findAll(fields = ["*"], where = {}) {
    return database.select(fields).table(this.table).where(where);
  }

  findById(id, fields = ["*"]) {
    return database.select(fields).table(this.table).where({ id }).first();
  }

  findByEmail(email) {
    return database.select("*").from(this.table).where({ email }).first();
  }

  create(userData) {
    return database.insert(userData).into(this.table);
  }

  update(id, userData) {
    return database.update(userData).where({ id }).table(this.table);
  }

  delete(id) {
    return database.delete().where({ id }).table(this.table);
  }
}
