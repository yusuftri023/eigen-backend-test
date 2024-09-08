import { knexConnection } from "../../infrastructures/database/config.js";

export default class BookRepository {
  async findAll() {
    throw new Error(
      "Terjadi Polymorphism, implementasi method ini di child class"
    );
  }

  async findByCode(code) {
    throw new Error(
      "Terjadi Polymorphism, implementasi method ini di child class"
    );
  }

  async save(book) {
    throw new Error(
      "Terjadi Polymorphism, implementasi method ini di child class"
    );
  }
  async edit(code, book) {
    throw new Error(
      "Terjadi Polymorphism, implementasi method ini di child class"
    );
  }
  async remove(code) {
    throw new Error(
      "Terjadi Polymorphism, implementasi method ini di child class"
    );
  }
}
