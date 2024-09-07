import MemberService from "../src/applications/member/memberServices";
import MemberRepository from "../src/domains/member/MemberRepository";
import MemberController from "../src/interfaces/controllers/memberController";
import jest from "jest-mock";

const memberRepository = new MemberRepository();
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
      status: 200,
      message: "success",
      data: expect.any(Array),
    });
  });
});
