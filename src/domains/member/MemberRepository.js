import { knexConnection } from "../../infrastructures/database/config.js";

export default class MemberRepository {
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

  async save(member) {
    throw new Error(
      "Terjadi Polymorphism, implementasi method ini di child class"
    );
  }
  async edit(code, member) {
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
