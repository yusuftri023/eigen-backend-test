import { knexConnection } from "./config.js";

export default async function bookSchema() {
  knexConnection.schema
    .withSchema("public")
    .hasTable("book")
    .then(async (exist) => {
      if (!exist) {
        await knexConnection.schema
          .withSchema("public")
          .createTableIfNotExists("book", (table) => {
            table.string("code", 10).primary();
            table.string("title", 100).notNullable();
            table.string("author", 50).notNullable();
            table.integer("stock").notNullable();
          })
          .then(() => {
            console.log("book table created");
          });
        const seedConfig = [
          {
            code: "HP-1",
            title: "Harry Potter",
            author: "Harry the wizard",
            stock: 3,
          },
          {
            code: "CDR-2",
            title: "Cinderella",
            author: "Step Mother",
            stock: 3,
          },
          {
            code: "PCH-3",
            title: "Pocahontas",
            author: "John Smith",
            stock: 3,
          },
          {
            code: "STR-4",
            title: "Starwars",
            author: "Luke Skywalker",
            stock: 3,
          },
        ];
        await knexConnection("book").insert(seedConfig);
      }
    });
}
