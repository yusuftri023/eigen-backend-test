class MemberController {
  constructor(memberService) {
    this.memberService = memberService;
  }
  async getAllMembers(req, res) {
    const data = await this.memberService.getAllMembers();
    return res.status(200).json({
      status: 200,
      message: "success",
      data,
    });
  }

  async getMember(req, res) {
    const data = await this.memberService.getMemberByCode(req.params.code);
    return res.json({
      status: 200,
      message: "success",
      data,
    });
  }

  async createMember(req, res) {
    const data = await this.memberService.createMember(req.body);
    return res.json({
      status: 200,
      message: "success",
      data,
    });
  }
  async updateMember(req, res) {
    const data = await this.memberService.updateMemberByCode(req.params.code);
    return res.json({
      status: 200,
      message: "success",
      data,
    });
  }
  async deleteMember(req, res) {
    const data = await this.memberService.deleteMemberByCode(req.params.code);
    return res.json({
      status: 200,
      message: "success",
      data,
    });
  }
}
export default MemberController;
