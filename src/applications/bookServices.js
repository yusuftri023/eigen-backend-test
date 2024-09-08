import Book from "../domains/book/book.js";

class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }
  async getAllBooks(options = null) {
    return await this.bookRepository.findAll(options);
  }
  async getBookByCode(code) {
    return await this.bookRepository.findByCode(code);
  }
  async saveBook(bookData) {
    const book = new Book(
      bookData.code,
      bookData.title,
      bookData.author,
      bookData.stock
    );
    return await this.bookRepository.save(book);
  }
  async updateBookByCode(code, bookData) {
    const bookFromDb = await this.bookRepository.findByCode(code);
    const newBook = { bookFromDb, ...bookData };
    const book = new Book(
      newBook.code,
      newBook.title,
      newBook.author,
      newBook.stock
    );
    return await this.bookRepository.edit(code, book);
  }
  async deleteBookByCode(code) {
    return await this.bookRepository.remove(code);
  }
}
export default BookService;
