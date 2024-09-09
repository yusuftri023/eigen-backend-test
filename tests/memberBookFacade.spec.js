import jest from "jest-mock";
import PostgreMemberRepository from "../src/infrastructures/repositories/PostgreMemberRepository";
import PostgreBookRepository from "../src/infrastructures/repositories/PostgreBookRepository";
import MemberBookFacadeService from "../src/applications/memberBookFacadeServices";
import MemberBookFacadeController from "../src/interfaces/controllers/memberBookFacadeController";

const memberRepository = new PostgreMemberRepository();
const bookRepository = new PostgreBookRepository();
const memberBookFacadeService = new MemberBookFacadeService(
  memberRepository,
  bookRepository
);
const memberBookFacadeController = new MemberBookFacadeController(
  memberBookFacadeService
);
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

describe("get Member all borrowed books", () => {
  test("response success with all of the member's borrowed books", async () => {
    let req = mockRequest();
    req.params = {
      memberCode: "M001",
    };
    const res = mockResponse();
    await memberBookFacadeController.getMemberAllBooks(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "All Member's books fetched successfully",
      member_books: expect.any(Array),
    });
  });
  test("response success but Member has no borrowed books", async () => {
    let req = mockRequest();
    req.params = {
      memberCode: "M009",
    };
    const res = mockResponse();
    await memberBookFacadeController.getMemberAllBooks(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "This Member never borrowed any book",
    });
  });
  test("Not found error response", async () => {
    let req = mockRequest();
    req.params = {
      memberCode: "M099",
    };
    const res = mockResponse();
    await memberBookFacadeController.getMemberAllBooks(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "no member entry with this code",
    });
  });
  test("Internal server error response", async () => {
    let req = mockRequest();
    req.params = {
      memberCode: () => {
        throw new Error("test error");
      },
    };
    const res = mockResponse();
    await memberBookFacadeController.getMemberAllBooks(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: expect.any(String),
    });
  });
});

describe("Member trying to borrow a book", () => {
  test("Not found error response", async () => {
    let req = mockRequest();
    req.body = {
      memberCode: "M099",
      bookCode: "HP-1",
    };
    const res = mockResponse();
    await memberBookFacadeController.borrowBook(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "no member entry with this code",
    });
  });
  test("Bad request error response", async () => {
    let req = mockRequest();
    req.body = {
      membercCode: "M099",
    };
    const res = mockResponse();
    await memberBookFacadeController.borrowBook(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "Your request is not complete or invalid",
    });
  });
  test("Forbidden request error response because member is currently penalized", async () => {
    let req = mockRequest();
    req.body = {
      memberCode: "M009",
      bookCode: "HP-1",
    };
    const res = mockResponse();
    await memberBookFacadeController.borrowBook(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "Member is currently penalized and cannot borrow books",
    });
  });
  test("Forbidden request error response because member is currently borrowing 2 books", async () => {
    let req = mockRequest();
    req.body = {
      memberCode: "M001",
      bookCode: "HP-1",
    };
    const res = mockResponse();
    await memberBookFacadeController.borrowBook(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "Member cannot borrow more than two books at once",
    });
  });
  test("Forbidden request error response because the book is currently out of stock", async () => {
    let req = mockRequest();
    req.body = {
      memberCode: "M004",
      bookCode: "OOS-1",
    };
    const res = mockResponse();
    await memberBookFacadeController.borrowBook(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "Book is out of stock",
    });
  });
  test("Internal server error response", async () => {
    let req = mockRequest();
    req.body = {
      memberCode: () => {
        throw new Error("test error");
      },
      bookCode: () => {
        throw new Error("test error");
      },
    };
    const res = mockResponse();
    await memberBookFacadeController.borrowBook(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: expect.any(String),
    });
  });
  test("response success", async () => {
    let req = mockRequest();
    req.body = {
      memberCode: "M004",
      bookCode: "HP-1",
    };
    const res = mockResponse();
    await memberBookFacadeController.borrowBook(req, res);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Member successfully borrowed the book",
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe("Member returning a book", () => {
  test("Not found error response for member", async () => {
    let req = mockRequest();
    req.body = {
      memberCode: "M099",
      bookCode: "HP-1",
    };
    const res = mockResponse();
    await memberBookFacadeController.returnBook(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "no member entry with this code",
    });
  });
  test("Not found error response for book", async () => {
    let req = mockRequest();
    req.body = {
      memberCode: "M001",
      bookCode: "HPssd-1",
    };
    const res = mockResponse();
    await memberBookFacadeController.returnBook(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "no book entry with this code",
    });
  });
  test("Bad request error response", async () => {
    let req = mockRequest();
    req.body = {
      membercCode: "M099",
    };
    const res = mockResponse();
    await memberBookFacadeController.returnBook(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "Your request is not complete or invalid",
    });
  });
  test("Forbidden request error response because member trying to return a wrong book", async () => {
    let req = mockRequest();
    req.body = {
      memberCode: "M009",
      bookCode: "HP-1",
    };
    const res = mockResponse();
    await memberBookFacadeController.returnBook(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "Member returned a book that he did not borrow",
    });
  });

  test("Internal server error response", async () => {
    let req = mockRequest();
    req.body = {
      memberCode: () => {
        throw new Error("test error");
      },
      bookCode: () => {
        throw new Error("test error");
      },
    };
    const res = mockResponse();
    await memberBookFacadeController.returnBook(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: expect.any(String),
    });
  });
  test("response success indicating member has returned the book", async () => {
    let req = mockRequest();
    req.body = {
      memberCode: "M004",
      bookCode: "HP-1",
    };
    const res = mockResponse();
    await memberBookFacadeController.returnBook(req, res);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Member has returned the book",
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
