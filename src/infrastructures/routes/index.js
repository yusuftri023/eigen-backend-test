import express from "express";
import { createBookRouter } from "./bookRoutes.js";
import { createMemberRouter } from "./memberRoutes.js";
import MemberController from "../../interfaces/controllers/memberController.js";
import BookController from "../../interfaces/controllers/bookController.js";
import BookService from "../../applications/book/bookServices.js";
import MemberService from "../../applications/member/memberServices.js";
import BookRepository from "../../domains/book/BookRepository.js";
import MemberRepository from "../../domains/member/MemberRepository.js";
const router = express.Router();

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

const memberRepository = new MemberRepository();
const memberService = new MemberService(memberRepository);
const memberController = new MemberController(memberService);

router.use("/books", createBookRouter(bookController));
router.use("/members", createMemberRouter(memberController));
export default router;
