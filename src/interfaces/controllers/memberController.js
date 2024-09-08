class MemberController {
  constructor(memberService) {
    this.memberService = memberService;
  }
  async getAllMembers(req, res) {
    try {
      const members = await this.memberService.getAllMembers();
      if (members.length === 0) {
        return res.status(200).json({
          status: "success",
          message: "There is no member currently in this database",
          members: [],
        });
      }
      return res.status(200).json({
        status: "success",
        message: "All Members fetched successfully",
        members,
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  }

  async getMember(req, res) {
    try {
      const { memberCode } = req.params;
      const member = await this.memberService.getMemberByCode(memberCode);
      if (!member) {
        return res.status(404).json({
          status: "failed",
          message: "no member entry with this code",
        });
      }
      return res.json({
        status: 200,
        message: "Member's data fetched successfully",
        member,
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  }

  async createMember(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({
          status: "failed",
          message: "Your request is not complete or invalid",
        });
      }
      await this.memberService.createMember(name);
      return res.status(201).json({
        status: "success",
        message: "Member created successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  async updateMember(req, res) {
    try {
      const { code, name, is_penalized } = req.body;
      if (!code || !name || !(typeof is_penalized === "boolean")) {
        return res.status(400).json({
          status: "failed",
          message: "Your request is not complete or invalid",
        });
      }
      const member = await this.memberService.getMemberByCode(code);
      if (!member) {
        return res.status(404).json({
          status: "failed",
          message: "no member entry with this code",
        });
      }
      await this.memberService.updateMemberByCode(code, {
        name,
        is_penalized,
      });
      return res.status(200).json({
        status: "success",
        message: "Member's data updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  async deleteMember(req, res) {
    try {
      const { memberCode } = req.params;
      if (memberCode === undefined) {
        return res.status(400).json({
          status: "failed",
          message: "Your request is not complete or invalid",
        });
      }
      const member = await this.memberService.getMemberByCode(memberCode);
      if (!member) {
        return res.status(404).json({
          status: "failed",
          message: "no member entry with this code",
        });
      }
      await this.memberService.deleteMemberByCode(memberCode);
      return res.status(200).json({
        status: "success",
        message: "Member removed successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  }
}
export default MemberController;
