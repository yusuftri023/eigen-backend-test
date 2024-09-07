import { knexConnection } from "../../infrastructures/database/config.js";

export default class MemberRepository {
  async findAll() {
    const result = await knexConnection.from("member").select("*");
    return result;
  }

  async findByCode(code) {
    const result = await knexConnection.from("member").select("*").where({
      code,
    });
    return result;
  }

  async save(member) {
    await knexConnection.from("member").insert(member);
    return true;
  }
  async edit(code, member) {
    await knexConnection
      .from("member")
      .upsert({ code }, ["code"])
      .where({ code });
    return true;
  }
  async remove(code) {
    await knexConnection.from("member").where({ code }).delete();
    return true;
  }
}
