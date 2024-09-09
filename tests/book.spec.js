import jest from "jest-mock";
import PostgreBookRepository from "../src/infrastructures/repositories/PostgreBookRepository";
import BookService from "../src/applications/bookServices";
import BookController from "../src/interfaces/controllers/bookController";
const bookRepository = new PostgreBookRepository();
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
      status: "success",
      message: "Book list fetched successfully",
      books: expect.any(Array),
    });
  });
});
describe("get all available books in database", () => {
  test("response success with all available books", async () => {
    const req = mockRequest();
    const res = mockResponse();

    await bookController.getAllAvailableBooks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Available book list fetched successfully",
      books: expect.any(Array),
    });
  });
});

describe("get specific book by code", () => {
  test("response success with book object returned", async () => {
    let req = mockRequest();
    req.params = { bookCode: "TEST-1" };
    const res = mockResponse();

    await bookController.getBook(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Book fetched successfully",
      book: expect.any(Object),
    });
  });
  test("Not Found error response", async () => {
    let req = mockRequest();
    req.params = { bookCode: "TESsdT-1" };
    const res = mockResponse();

    await bookController.getBook(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "no book entry with this code",
    });
  });
  test("Bad request error response", async () => {
    let req = mockRequest();
    const res = mockResponse();

    await bookController.getBook(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "Your request is not complete or invalid",
    });
  });
  test("Internal server error response", async () => {
    let req = mockRequest();
    req.params = {
      bookCode: function () {
        throw new Error("Internal Server Error");
      },
    };

    const res = mockResponse();

    await bookController.getBook(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: expect.any(String),
    });
  });
});

describe("save book to database", () => {
  test("Success response", async () => {
    let req = mockRequest();
    req.body = {
      code: "TEST-123",
      title: "Test",
      author: "Test",
      stock: 1,
    };
    const res = mockResponse();

    await bookController.saveBook(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Book entry created successfully",
    });
  });
  test("Internal server error response", async () => {
    let req = mockRequest();
    req.body = {
      title: function () {
        throw new Error("Internal Server Error");
      },
      code: function () {
        throw new Error("Internal Server Error");
      },
      author: "Test",
      stock: 1,
    };

    const res = mockResponse();

    await bookController.saveBook(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: expect.any(String),
    });
  });
  test("Bad request error response", async () => {
    let req = mockRequest();
    const res = mockResponse();

    await bookController.saveBook(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "Your request is not complete or invalid",
    });
  });
  test("Conflict error response", async () => {
    let req = mockRequest();
    req.body = {
      code: "TEST-1",
      title: "Test",
      author: "Test",
      stock: 1,
    };
    const res = mockResponse();

    await bookController.saveBook(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "There is already book entry with this code",
    });
  });
});

describe("update a book", () => {
  test("Success response", async () => {
    let req = mockRequest();
    req.body = {
      code: "TEST-123",
      title: "ganti title",
      author: "Test",
      stock: 1,
    };
    const res = mockResponse();

    await bookController.updateBook(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Book's data updated successfully",
    });
  });
  test("Bad request response", async () => {
    let req = mockRequest();
    req.body = {
      coddse: "TEST-123",
      title: "ganti title",
      author: "Test",
      stock: 1,
    };
    const res = mockResponse();

    await bookController.updateBook(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "Your request is not complete or invalid",
    });
  });
  test("Not found error response", async () => {
    let req = mockRequest();
    req.body = {
      code: "IMpossibleD",
      title: "ganti title",
      author: "Test",
      stock: 1,
    };
    const res = mockResponse();

    await bookController.updateBook(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "no book entry with this code",
    });
  });
  test("Internal server error response", async () => {
    let req = mockRequest();
    req.body = {
      title: function () {
        throw new Error("Internal Server Error");
      },
      code: "TEST-123",
      author: "Test",
      stock: 1,
    };

    const res = mockResponse();

    await bookController.updateBook(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: expect.any(String),
    });
  });
});

describe("delete book from database", () => {
  test("Success response", async () => {
    let req = mockRequest();
    req.params = {
      bookCode: "TEST-123",
    };
    const res = mockResponse();

    await bookController.deleteBook(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Book's data removed successfully",
    });
  });
  test("Not found error response", async () => {
    let req = mockRequest();
    req.params = {
      bookCode: "ImpossiFleD",
    };
    const res = mockResponse();

    await bookController.deleteBook(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "no book entry with this code",
    });
  });
  test("Bad request response", async () => {
    let req = mockRequest();
    req.params = {
      bookCdode: "TEST-123",
    };
    const res = mockResponse();

    await bookController.deleteBook(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "Your request is not complete or invalid",
    });
  });
  test("Internal server error response", async () => {
    let req = mockRequest();
    req.params = {
      bookCode: function () {
        throw new Error("Internal Server Error");
      },
    };

    const res = mockResponse();

    await bookController.deleteBook(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: expect.any(String),
    });
  });
});
