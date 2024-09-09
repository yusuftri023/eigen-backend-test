import jest from "jest-mock";
import PostgreMemberRepository from "../src/infrastructures/repositories/PostgreMemberRepository";
import MemberService from "../src/applications/memberServices";
import MemberController from "../src/interfaces/controllers/memberController";

const memberRepository = new PostgreMemberRepository();
const memberService = new MemberService(memberRepository);
const memberController = new MemberController(memberService);
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

describe("get all members in database", () => {
  test("response success with all members", async () => {
    let req = mockRequest();
    const res = mockResponse();
    await memberController.getAllMembers(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "All Members fetched successfully",
      members: expect.any(Array),
    });
  });
});
describe("get specific members in database", () => {
  test("response success with all members", async () => {
    let req = mockRequest();
    req.params = {
      memberCode: "M001",
    };
    const res = mockResponse();
    await memberController.getMember(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Member's data fetched successfully",
      member: expect.any(Object),
    });
  });
});

describe("create a new member to database", () => {
  test("Success response", async () => {
    let req = mockRequest();
    req.body = {
      name: "TESTINGTESTING",
    };
    const res = mockResponse();
    await memberController.createMember(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Member created successfully",
    });
  });
  test("Internal server error response", async () => {
    let req = mockRequest();
    req.body = {
      name: function () {
        throw new Error("Internal Server Error");
      },
    };
    const res = mockResponse();
    await memberController.createMember(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: expect.any(String),
    });
  });
  test("Bad request error response", async () => {
    let req = mockRequest();
    req.body = {};
    const res = mockResponse();

    await memberController.createMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "Your request is not complete or invalid",
    });
  });
});

describe("update a member", () => {
  test("Success response", async () => {
    let req = mockRequest();
    req.body = {
      code: "M008",
      name: "ganti nama test",
      is_penalized: false,
    };
    const res = mockResponse();

    await memberController.updateMember(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Member's data updated successfully",
    });
  });
  test("Bad request response", async () => {
    let req = mockRequest();
    req.body = {};
    const res = mockResponse();

    await memberController.updateMember(req, res);

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
      name: "ganti title",
      is_penalized: false,
    };
    const res = mockResponse();

    await memberController.updateMember(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "no member entry with this code",
    });
  });
  test("Internal server error response", async () => {
    let req = mockRequest();
    req.body = {
      code: function () {
        throw new Error("Internal Server Error");
      },
      name: "TEST-123",
      is_penalized: false,
    };

    const res = mockResponse();

    await memberController.updateMember(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: expect.any(String),
    });
  });
});

describe("delete member from database", () => {
  // skipped because of foreign key constraints
  xtest("Success response", async () => {
    let req = mockRequest();
    req.params = {
      memberCode: "M001",
    };
    const res = mockResponse();

    await memberController.deleteMember(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Member's data removed successfully",
    });
  });
  test("Not found error response", async () => {
    let req = mockRequest();
    req.params = {
      memberCode: "ImpossiFleD",
    };
    const res = mockResponse();

    await memberController.deleteMember(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "no member entry with this code",
    });
  });
  test("Bad request response", async () => {
    let req = mockRequest();
    req.params = {
      memberCdode: "TEST-123",
    };
    const res = mockResponse();

    await memberController.deleteMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: "Your request is not complete or invalid",
    });
  });
  test("Internal server error response", async () => {
    let req = mockRequest();
    req.params = {
      memberCode: function () {
        throw new Error("Internal Server Error");
      },
    };

    const res = mockResponse();

    await memberController.deleteMember(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "failed",
      message: expect.any(String),
    });
  });
});
