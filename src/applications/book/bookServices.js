import Book from "../../domains/book/book.js";

class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }
  async getAllBooks() {
    return this.bookRepository.findAll();
  }
  async getBookByCode(code) {
    return this.bookRepository.findByCode(code);
  }
  async createBook(bookData) {
    const book = new Book(
      bookData.code,
      bookData.title,
      bookData.author,
      bookData.stock
    );
    return this.bookRepository.save(book);
  }
  async updateBookByCode(code) {
    return this.bookRepository.edit(code);
  }
  async returnBook(code) {
    return this.bookRepository.edit(code);
  }
  async borrowBook(code) {
    return this.bookRepository.edit(code);
  }
  async deleteBookByCode(code) {
    return this.bookRepository.remove(code);
  }
}
export default BookService;
