import express from "express";
export function createMemberBookFacadeRouter(memberBookFacadeController) {
  const router = express.Router();
  router.get(
    "/:memberCode",
    memberBookFacadeController.getMemberAllBooks.bind(
      memberBookFacadeController
    )
  );

  router.post(
    "/borrow",
    memberBookFacadeController.borrowBook.bind(memberBookFacadeController)
  );
  router.patch(
    "/return",
    memberBookFacadeController.returnBook.bind(memberBookFacadeController)
  );

  return router;
}
