class MemberBookFacadeController {
  constructor(memberBookFacadeService) {
    this.memberBookFacadeService = memberBookFacadeService;
  }

  async getMemberAllBooks(req, res) {
    try {
      const { memberCode } = req.params;
      const member = await this.memberBookFacadeService.getMemberByCode(
        memberCode
      );
      if (!member) {
        return res.status(404).json({
          status: "failed",
          message: "no member entry with this code",
        });
      }
      const member_books =
        await this.memberBookFacadeService.getMemberBooksByCode(memberCode);
      if (member_books.length === 0) {
        return res.status(200).json({
          status: "success",
          message: "This Member never borrowed any book",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "All Member's books fetched successfully",
        member_books,
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  async borrowBook(req, res) {
    try {
      const { memberCode, bookCode } = req.body;
      if (!memberCode || !bookCode) {
        return res.status(400).json({
          status: "failed",
          message: "Your request is not complete or invalid",
        });
      }
      const member = await this.memberBookFacadeService.getMemberByCode(
        memberCode
      );
      if (!member) {
        return res.status(404).json({
          status: "failed",
          message: "no member entry with this code",
        });
      }
      if (member.is_penalized === true) {
        return res.status(403).json({
          status: "failed",
          message: "Member is currently penalized and cannot borrow books",
        });
      }
      const book = await this.memberBookFacadeService.getBookByCode(bookCode);
      if (!book) {
        return res.status(404).json({
          status: "failed",
          message: "no book entry with this code",
        });
      }
      const memberCurrentBorrowedBooks =
        await this.memberBookFacadeService.getMemberCurrentBooksByCode(
          memberCode
        );
      if (memberCurrentBorrowedBooks.length >= 2) {
        return res.status(403).json({
          status: "failed",
          message: "Member cannot borrow more than two books at once",
        });
      }
      const stock = await this.memberBookFacadeService.getBookStockByCode(
        bookCode
      );
      if (stock < 1) {
        return res.status(403).json({
          status: "failed",
          message: "Book is out of stock",
        });
      }
      await this.memberBookFacadeService.memberBorrowBook(memberCode, bookCode);
      return res.status(201).json({
        status: "success",
        message: "Member successfully borrowed the book",
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  async returnBook(req, res) {
    try {
      const { memberCode, bookCode } = req.body;
      if (!memberCode || !bookCode) {
        return res.status(400).json({
          status: "failed",
          message: "Your request is not complete or invalid",
        });
      }
      const member = await this.memberBookFacadeService.getMemberByCode(
        memberCode
      );
      if (!member) {
        return res.status(404).json({
          status: "failed",
          message: "no member entry with this code",
        });
      }
      const book = await this.memberBookFacadeService.getBookByCode(bookCode);
      if (!book) {
        return res.status(404).json({
          status: "failed",
          message: "no book entry with this code",
        });
      }
      const memberCurrentBorrowedBooks =
        await this.memberBookFacadeService.getMemberCurrentBooksByCode(
          memberCode
        );
      const isReturnedBookCorrect = memberCurrentBorrowedBooks.some((entry) => {
        return entry.book_code === bookCode;
      });
      if (!isReturnedBookCorrect) {
        return res.status(403).json({
          status: "failed",
          message: "Member returned a book that he did not borrow",
        });
      }
      await this.memberBookFacadeService.memberReturnBook(memberCode, bookCode);
      return res.status(200).json({
        status: "success",
        message: "Member has returned the book",
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  }
}
export default MemberBookFacadeController;
