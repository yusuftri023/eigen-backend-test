class BookController {
  constructor(bookService) {
    this.bookService = bookService;
  }
  async getAllBooks(req, res) {
    const data = await this.bookService.getAllBooks();
    return res.status(200).json({
      status: 200,
      message: "success",
      data,
    });
  }

  async getBook(req, res) {
    const data = await this.bookService.getBookByCode(req.params.code);
    if (data.length === 0) {
      return res.json({
        status: 200,
        message: "no book entry with this code",
        data: null,
      });
    }
    return res.json({
      status: 200,
      message: "success",
      data,
    });
  }

  async createBook(req, res) {
    const data = await this.bookService.createBook(req.body);
    return res.json({
      status: 200,
      message: "success",
      data,
    });
  }
  async returnBook(req, res) {
    const data = await this.bookService.createBook(req.body);
    return res.json({
      status: 200,
      message: "success",
      data,
    });
  }
  async borrowBook(req, res) {
    const data = await this.bookService.createBook(req.body);
    return res.json({
      status: 200,
      message: "success",
      data,
    });
  }
  async updateBook(req, res) {
    const data = await this.bookService.updateBookByCode(req.params.code);
    return res.json({
      status: 200,
      message: "success",
      data,
    });
  }
  async deleteBook(req, res) {
    const data = await this.bookService.deleteBookByCode(req.params.code);
    return res.json({
      status: 200,
      message: "success",
      data,
    });
  }
}
export default BookController;
