// src/routes/users.router.js

import express from "express";
import { prisma } from "../utils/prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/** 사용자 회원가입 API **/
router.post("/sign-up", async (req, res, next) => {
  const { email, password, name, age, gender, profileImage } = req.body;
  const isExistUser = await prisma.accounts.findFirst({
    where: {
      email,
    },
  });

  if (isExistUser) {
    return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
  }

  // 사용자 비밀번호를 암호화합니다.
  const hashedPassword = await bcrypt.hash(password, 10);

  // accounts 테이블에 사용자를 추가합니다.
  const account = await prisma.accounts.create({
    data: {
      email,
      password: hashedPassword, // 암호화된 비밀번호를 저장합니다.
    },
  });
  // accountInfos 테이블에 사용자 정보를 추가합니다.
  const accountInfo = await prisma.accountInfos.create({
    data: {
      accountId: account.accountId, // 생성한 계정의 accountId 바탕으로 사용자 정보를 생성합니다.
      name,
      age,
      gender: gender.toUpperCase(), // 성별을 대문자로 변환합니다.
      profileImage,
    },
  });

  return res.status(201).json({ message: "회원가입이 완료되었습니다." });
});

/** 로그인 API **/
router.post("/sign-in", async (req, res, next) => {
  const { email, password } = req.body;
  const account = await prisma.accounts.findFirst({ where: { email } });

  if (!account)
    return res.status(401).json({ message: "존재하지 않는 이메일입니다." });
  // 입력받은 계정의 비밀번호와 데이터베이스에 저장된 비밀번호를 비교합니다.
  else if (!(await bcrypt.compare(password, account.password)))
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });

  // 로그인에 성공하면, 계정의 accountId를 바탕으로 토큰을 생성합니다.
  const token = jwt.sign(
    {
      accountId: account.accountId,
    },
    "custom-secret-key",
  );

  // authotization 쿠키에 Berer 토큰 형식으로 JWT를 저장합니다.
  res.cookie("authorization", `Bearer ${token}`);
  return res.status(200).json({ message: "로그인 성공" });
});

// src/routes/users.route.js

/** 사용자 조회 API **/
router.get("/accounts", authMiddleware, async (req, res, next) => {
  const { accountId } = req.account;

  const account = await prisma.accounts.findFirst({
    where: { accountId: +accountId },
    select: {
      accountId: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      accountInfos: {
        // 1:1 관계를 맺고있는 UserInfos 테이블을 조회합니다.
        select: {
          name: true,
          age: true,
          gender: true,
          profileImage: true,
        },
      },
    },
  });

  return res.status(200).json({ data: account });
});

export default router;
