import express from "express";

export function createBookRouter(bookController) {
  const router = express.Router();
  router.get("/", bookController.getAllBooks.bind(bookController));
  router.get("/:code", bookController.getBook.bind(bookController));
  router.post("/", bookController.createBook.bind(bookController));
  router.post("/borrow", bookController.borrowBook.bind(bookController));
  router.post("/return", bookController.returnBook.bind(bookController));
  router.patch("/:code", bookController.updateBook.bind(bookController));
  router.delete("/:code", bookController.deleteBook.bind(bookController));
  return router;
}
