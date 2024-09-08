class BookController {
  constructor(bookService) {
    this.bookService = bookService;
  }
  async getAllBooks(req, res) {
    try {
      const books = await this.bookService.getAllBooks();
      if (books.length === 0) {
        return res.status(200).json({
          status: "success",
          message: "There is no book currently in this database",
          books: [],
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Book list fetched successfully",
        books,
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  async getAllAvailableBooks(req, res) {
    try {
      const books = await this.bookService.getAllBooks({ filter: true });
      if (books.length === 0) {
        return res.status(200).json({
          status: "success",
          message: "There is no book currently available in this database",
          books: [],
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Available book list fetched successfully",
        books,
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  }

  async getBook(req, res) {
    try {
      const book = await this.bookService.getBookByCode(req.params.code);
      if (!book) {
        return res.status(404).json({
          status: "failed",
          message: "no book entry with this code",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Book list fetched successfully",
        book,
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  }

  async saveBook(req, res) {
    try {
      const { code, title, author, stock } = req.body;

      if (!code || !title || !author || !stock) {
        return res.status(400).json({
          status: "failed",
          message: "Your request is not complete or invalid",
        });
      }
      const book = await this.bookService.getBookByCode(code);
      if (book) {
        return res.status(409).json({
          status: "failed",
          message: "There is already book entry with this code",
        });
      }
      await this.bookService.saveBook({
        code,
        title,
        author,
        stock,
      });
      return res.status(201).json({
        status: "success",
        message: "Book entry created successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  }

  async updateBook(req, res) {
    try {
      const { code, title, author, stock } = req.body;
      if (!code || !title || !author || !stock) {
        return res.status(400).json({
          status: "failed",
          message: "Your request is not complete or invalid",
        });
      }
      const book = await this.bookService.getBookByCode(code);
      if (!book) {
        return res.status(404).json({
          status: "failed",
          message: "no book entry with this code",
        });
      }
      const newData = { title, author, stock };
      await this.bookService.updateBookByCode(code, newData);
      return res.status(200).json({
        status: "success",
        message: "Book's data updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  }

  // can only delete when no books borrowed
  async deleteBook(req, res) {
    try {
      const { bookCode } = req.params;
      if (bookCode === undefined) {
        return res.status(400).json({
          status: "failed",
          message: "Your request is not complete or invalid",
        });
      }
      const book = await this.bookService.getBookByCode(bookCode);
      if (!book) {
        return res.status(404).json({
          status: "failed",
          message: "no book entry with this code",
        });
      }
      await this.bookService.deleteBookByCode(bookCode);
      return res.status(200).json({
        status: "success",
        message: "Book's data removed successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  }
}
export default BookController;
