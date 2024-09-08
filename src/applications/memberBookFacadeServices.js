import Book from "../domains/book/book.js";

export default class MemberBookFacadeService {
  constructor(memberRepository, bookRepository) {
    this.memberRepository = memberRepository;
    this.bookRepository = bookRepository;
  }
  async getMemberByCode(code) {
    return await this.memberRepository.findByCode(code);
  }
  async getBookByCode(code) {
    return await this.bookRepository.findByCode(code);
  }
  async getMemberBooksByCode(code) {
    return await this.memberRepository.findAllByCode(code);
  }
  async getMemberCurrentBooksByCode(code) {
    return await this.memberRepository.findAllBorrowedByCode(code);
  }
  async getBookStockByCode(bookCode) {
    const book = await this.bookRepository.findByCode(bookCode);
    return book.stock;
  }
  async memberBorrowBook(memberCode, bookCode) {
    await this.memberRepository.saveMemberBook(memberCode, bookCode);
    const bookFromDb = await this.bookRepository.findByCode(bookCode);
    const newBook = { ...bookFromDb, stock: bookFromDb.stock - 1 };
    const book = new Book(
      newBook.code,
      newBook.title,
      newBook.author,
      newBook.stock
    );
    await this.bookRepository.edit(bookCode, book);
    return true;
  }
  async memberReturnBook(memberCode, bookCode) {
    const bookFromDb = await this.bookRepository.findByCode(bookCode);
    const newBook = { ...bookFromDb, stock: bookFromDb.stock + 1 };
    const book = new Book(
      newBook.code,
      newBook.title,
      newBook.author,
      newBook.stock
    );
    await this.bookRepository.edit(bookCode, book);
    await this.memberRepository.updateReturnedDateByCode(memberCode, bookCode);
    return true;
  }
}
