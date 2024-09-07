import express from "express";
export function createMemberRouter(memberController) {
  const router = express.Router();

  router.get("/", memberController.getAllMembers.bind(memberController));
  router.get("/:code", memberController.getMember.bind(memberController));
  router.post("/", memberController.createMember.bind(memberController));
  router.patch("/:code", memberController.updateMember.bind(memberController));
  router.delete("/:code", memberController.deleteMember.bind(memberController));
  return router;
}
