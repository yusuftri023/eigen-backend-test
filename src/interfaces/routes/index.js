import express from "express";
import { createBookRouter } from "./bookRoutes.js";
import { createMemberRouter } from "./memberRoutes.js";
import MemberController from "../controllers/memberController.js";
import BookController from "../controllers/bookController.js";
import BookService from "../../applications/bookServices.js";
import MemberService from "../../applications/memberServices.js";
import PostgreBookRepository from "../../infrastructures/repositories/PostgreBookRepository.js";
import PostgreMemberRepository from "../../infrastructures/repositories/PostgreMemberRepository.js";
import MemberBookFacadeService from "../../applications/memberBookFacadeServices.js";
import MemberBookFacadeController from "../controllers/memberBookFacadeController.js";
import { createMemberBookFacadeRouter } from "./memberBookRoutes.js";
const router = express.Router();

const bookRepository = new PostgreBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

const memberRepository = new PostgreMemberRepository();
const memberService = new MemberService(memberRepository);
const memberController = new MemberController(memberService);

const memberBookFacadeService = new MemberBookFacadeService(
  memberRepository,
  bookRepository
);
const memberBookFacadeController = new MemberBookFacadeController(
  memberBookFacadeService
);

router.use("/books", createBookRouter(bookController));
router.use("/members", createMemberRouter(memberController));
router.use(
  "/member-book",
  createMemberBookFacadeRouter(memberBookFacadeController)
);

export default router;
