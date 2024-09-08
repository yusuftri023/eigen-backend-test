import express from "express";
export function createMemberRouter(memberController) {
  const router = express.Router();

  router.get("/", memberController.getAllMembers.bind(memberController));
  router.get("/:memberCode", memberController.getMember.bind(memberController));
  router.post("/", memberController.createMember.bind(memberController));
  router.patch("/", memberController.updateMember.bind(memberController));
  router.delete(
    "/:memberCode",
    memberController.deleteMember.bind(memberController)
  );
  return router;
}
