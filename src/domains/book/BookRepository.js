import { knexConnection } from "../../infrastructures/database/config.js";

export default class BookRepository {
  async findAll() {
    const result = await knexConnection.from("book").select("*");
    return result;
  }

  async findByCode(code) {
    const result = await knexConnection.from("book").select("*").where({
      code,
    });
    return result;
  }

  async save(book) {
    await knexConnection.from("book").insert(book);
    return true;
  }
  async edit(code, book) {
    await knexConnection
      .from("book")
      .upsert({ ...book }, ["code"])
      .where({ code });
    return true;
  }
  async remove(code) {
    await knexConnection.from("book").where({ code }).delete();
    return true;
  }
}
