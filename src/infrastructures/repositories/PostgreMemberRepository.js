import knex from "knex";
import MemberRepository from "../../domains/member/MemberRepository.js";
import { knexConnection } from "../database/config.js";

export default class PostgreMemberRepository extends MemberRepository {
  async findAll() {
    const result = await knexConnection.from("member as m").select("*");
    return result;
  }

  async findByCode(code) {
    const [result] = await knexConnection.from("member").select("*").where({
      code,
    });
    return result;
  }
  async findAllByCode(code) {
    const result = await knexConnection
      .from("member_books")
      .select("*")
      .where({ member_code: code })
      .orderBy("borrowed_at", "desc");
    return result;
  }
  async findAllBorrowedByCode(code) {
    const result = await knexConnection
      .from("member_books")
      .select("*")
      .where({ member_code: code })
      .andWhere({ returned_at: null })
      .orderBy("borrowed_at", "desc");
    return result;
  }
  async findBorrowedByCode(code) {
    const result = await knexConnection
      .from("member_books")
      .select("*")
      .where({ member_code: code })
      .andWhere({ returned_at: null })
      .orderBy("borrowed_at", "desc");
    return result;
  }
  async updateReturnedDateByCode(member_code, book_code) {
    await knexConnection
      .from("member_books")
      .update({ returned_at: new Date() })
      .where({ member_code, book_code, returned_at: null });
    return true;
  }
  async findTotalByCode(code) {
    const result = await knexConnection
      .from("member_books")
      .select("member_books.*")
      .join("member as m", "m.code", "member_books.member_code")
      .where({ member_code: code })
      .count("* as total");
    return result;
  }
  async save(member) {
    await knexConnection.from("member").insert(member);
    return true;
  }
  async saveMemberBook(member_code, book_code) {
    await knexConnection
      .from("member_books")
      .insert({ member_code, book_code });
    return true;
  }
  async edit(code, member) {
    await knexConnection
      .from("member")
      .update({ ...member })
      .where({ code });
    return true;
  }

  async remove(code) {
    await knexConnection.from("member").where({ code }).delete();
    return true;
  }
}
