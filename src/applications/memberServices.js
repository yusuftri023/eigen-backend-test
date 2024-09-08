import Member from "../domains/member/member.js";

class MemberService {
  constructor(memberRepository) {
    this.memberRepository = memberRepository;
  }
  async getAllMembers() {
    return await this.memberRepository.findAll();
  }
  async getMemberByCode(code) {
    return await this.memberRepository.findByCode(code);
  }

  async checkPenalizedStatus(code) {
    const member = await this.memberRepository.findByCode(code);
    return member.is_penalized;
  }

  async createMember(memberData) {
    const member = new Member(memberData);
    return await this.memberRepository.save(member);
  }
  async updateMemberByCode(code, member) {
    return await this.memberRepository.edit(code, member);
  }
  async deleteMemberByCode(code) {
    return await this.memberRepository.remove(code);
  }
}
export default MemberService;
