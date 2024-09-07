import BookService from "../src/applications/book/bookServices";
import BookRepository from "../src/domains/book/BookRepository";
import BookController from "../src/interfaces/controllers/bookController";

import jest from "jest-mock";
const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

const mockResponse = () => {
  let res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};
const mockRequest = () => {
  let req = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  req.query = jest.fn().mockReturnValue(req);
  return req;
};

describe("get all books in database", () => {
  test("response success with all books", async () => {
    const req = mockRequest();
    const res = mockResponse();

    await bookController.getAllBooks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: "success",
      data: expect.any(Array),
    });
  });
});
