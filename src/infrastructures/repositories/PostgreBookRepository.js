import BookRepository from "../../domains/book/BookRepository.js";
import { knexConnection } from "../database/config.js";

export default class PostgreBookRepository extends BookRepository {
  async findAll(options) {
    let result;
    if (options === null) {
      result = await knexConnection.from("book").select("*");
    } else if (options.filter === true) {
      result = await knexConnection
        .from("book")
        .select("*")
        .where("stock", ">", 0);
    }
    return result;
  }
  async findByCode(code) {
    const [result] = await knexConnection.from("book").select("*").where({
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
      .update({ ...book })
      .where({ code });
    return true;
  }
  async remove(code) {
    await knexConnection.from("book").where({ code }).delete();
    return true;
  }
}
