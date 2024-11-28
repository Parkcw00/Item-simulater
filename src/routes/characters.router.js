import express from "express";
import { prisma } from "../utils/prisma/index.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/** 캐릭터생성 API**/

router.post("/characters", authMiddleware, async (req, res, next) => {
  const { accountId } = req.account;
  const { name, class: className } = req.body;
  const isExistName = await prisma.characters.findFirst({
    where: {
      name,
    },
  });

  if (isExistName) {
    return res.status(409).json({ message: "이미 존재하는 닉네임입니다." });
  }

  const character = await prisma.characters.create({
    data: {
      accountId: +accountId,
      name,
      class: className,
    },
  });

  return res.status(201).json({ data: character });
});

// src/routes/posts.router.js

/** 서버에 존재하는 캐릭터 리스트 조회 API **/
router.get("/characters", async (req, res, next) => {
  const characters = await prisma.characters.findMany({
    select: {
      characterId: true,
      accountId: true,
      name: true,
      class: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc", // 캐릭터를 최신순으로 정렬합니다.
    },
  });

  return res.status(200).json({ data: characters });
});

// 캐릭터 삭제 API
router.delete(
  "/characters/:characterId",
  authMiddleware,
  async (req, res, next) => {
    const { accountId } = req.account;
    const { characterId } = req.params; // URL 파라미터에서 characterId를 가져옵니다.

    // 해당 캐릭터가 존재하는지 확인
    const character = await prisma.characters.findUnique({
      where: {
        characterId: +characterId, // 주어진 characterId로 캐릭터를 찾습니다.
      },
    });

    // 캐릭터가 존재하지 않으면 404 상태 코드와 함께 오류 메시지 반환
    if (!character) {
      return res
        .status(404)
        .json({ message: "해당 캐릭터가 존재하지 않습니다." });
    }

    // 캐릭터의 계정이 요청한 계정(accountId)과 일치하는지 확인
    if (character.accountId !== +accountId) {
      return res
        .status(403)
        .json({ message: "이 캐릭터는 당신의 캐릭터가 아닙니다." });
    }

    try {
      // 캐릭터 삭제
      await prisma.characters.delete({
        where: {
          characterId: +characterId, // 삭제할 캐릭터의 ID
        },
      });

      // 삭제 완료 후 200 상태 코드와 성공 메시지 반환
      return res
        .status(200)
        .json({ message: "캐릭터가 성공적으로 삭제되었습니다." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  },
);

router.get(
  "/characters/:characterId",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { characterId } = req.params;
      const { accountId } = req.account;

      // 해당 characterId를 가진 캐릭터 조회
      const character = await prisma.characters.findUnique({
        where: {
          characterId: +characterId,
        },
      });

      // 캐릭터가 존재하지 않으면 404 상태 코드와 함께 오류 메시지 반환
      if (!character) {
        return res
          .status(404)
          .json({ message: "해당 캐릭터가 존재하지 않습니다." });
      }

      const response = {
        name: character.name,
        hp: character.hp,
        atk: character.atk,
      };

      // 로그인한 사용자가 해당 캐릭터의 계정과 일치하면, 게임 머니를 포함
      if (character.accountId === +accountId) {
        response.money = character.money;
      }

      // 캐릭터 정보 반환
      return res.status(200).json(response);
    } catch (error) {
      //서버 오류 발생 시
      console.error(error);
      return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  },
);

export default router;
