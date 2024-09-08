import express from "express";

export function createBookRouter(bookController) {
  const router = express.Router();
  router.get("/", bookController.getAllBooks.bind(bookController));
  router.get(
    "/available",
    bookController.getAllAvailableBooks.bind(bookController)
  );
  router.get("/:bookCode", bookController.getBook.bind(bookController));
  router.post("/", bookController.saveBook.bind(bookController));
  router.patch("/", bookController.updateBook.bind(bookController));
  router.delete("/:bookCode", bookController.deleteBook.bind(bookController));
  return router;
}
