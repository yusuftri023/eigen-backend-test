import Member from "../../domains/member/member.js";

class MemberService {
  constructor(memberRepository) {
    this.memberRepository = memberRepository;
  }
  async getAllMembers() {
    return this.memberRepository.findAll();
  }
  async getMemberByCode(code) {
    return this.memberRepository.findByCode(code);
  }
  async createMember(memberData) {
    const member = new Member(memberData.name);
    return this.memberRepository.save(member);
  }
  async updateMemberByCode(code) {
    return this.memberRepository.edit(code);
  }
  async deleteMemberByCode(code) {
    return this.memberRepository.remove(code);
  }
}
export default MemberService;
