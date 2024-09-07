// create table Member(
//     code varchar(10) default concat('M', lpad(nextval('member_seq')::varchar, 3, '0')),
//     name varchar(50) not null,
//     is_penalized boolean default false,
//     primary key (code)
// )

import { knexConnection } from "./config.js";
import knex from "knex";
export default async function memberSchema() {
  await knexConnection.schema
    .withSchema("public")
    .hasTable("member")
    .then(async (exist) => {
      if (!exist) {
        await knexConnection.schema
          .withSchema("public")
          .raw(
            "CREATE SEQUENCE IF NOT EXISTS member_seq START 1 increment 1 minvalue 1 maxvalue 999 ;"
          )
          .then(() => {
            console.log("member sequence created");
          });
        await knexConnection.schema
          .raw(
            'create table "member" ("code" varchar(10) default concat(\'M\', lpad(nextval(\'member_seq\')::varchar, 3, \'0\')), "name" varchar(50) not null, "is_penalized" boolean default false, primary key ("code"))'
          )
          .then(() => {
            console.log("member table created");
          });

        await knexConnection("member").insert([
          {
            name: "Admin",
          },
          {
            name: "Eigen",
          },
          {
            name: "Yusuf",
          },
        ]);
      }
    });

  await knexConnection.schema
    .withSchema("public")
    .hasTable("member_books")
    .then(async (exist) => {
      if (!exist) {
        await knexConnection.schema
          .withSchema("public")
          .createTable("member_books", (table) => {
            table.string("member_code", 10).notNullable();
            table.string("book_code", 10).notNullable();
            table.dateTime("borrowed_at").defaultTo(knexConnection.fn.now());
            table.dateTime("returned_at").defaultTo(null);
            table
              .foreign("member_code")
              .references("member.code")
              .withKeyName("fk_member_code");
            table
              .foreign("book_code")
              .references("book.code")
              .withKeyName("fk_book_code");
          })
          .then(() => {
            console.log("member_books table created");
          });
        const seedConfig = [
          { member_code: "M001", book_code: "B001" },
          { member_code: "M001", book_code: "B002" },
          { member_code: "M002", book_code: "B001" },
          { member_code: "M003", book_code: "B003" },
          { member_code: "M003", book_code: "B004" },
        ];
        await knexConnection("member_books").insert(seedConfig);
      }
    });
}
