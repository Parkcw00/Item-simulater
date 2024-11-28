import express from "express";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

/** 아이템생성 API**/

router.post("/items", async (req, res, next) => {
  const { name, atk, def, hp, price } = req.body;
  const isExistItemName = await prisma.items.findFirst({
    where: {
      name,
    },
  });

  if (isExistItemName) {
    return res.status(409).json({ message: "이미 존재하는 아이템입니다." });
  }

  const item = await prisma.items.create({
    data: {
      name,
      atk,
      def,
      hp,
      price,
    },
  });

  return res.status(201).json({ data: item });
});

/** 서버에 존재하는 아이템 리스트 조회 API **/
router.get("/items", async (req, res, next) => {
  const items = await prisma.items.findMany({
    select: {
      itemId: true,
      name: true,
      price: true,
    },
    orderBy: {
      itemId: "desc", // 아이템을 가장 최근 생성된 순으로 정렬합니다.
    },
  });

  return res.status(200).json({ data: items });
});

router.get("/items/:itemId", async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await prisma.items.findUnique({
      where: {
        itemId: +itemId,
      },
    });

    if (!item) {
      return res
        .status(404)
        .json({ message: "해당 아이템이 존재하지 않습니다." });
    }

    const response = {
      name: item.name,
      atk: item.atk,
      def: item.def,
      hp: item.hp,
      price: item.price,
    };

    return res.status(200).json({ data: response });
  } catch (error) {
    //서버 오류 발생 시
    console.error(error);
    return res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

/** 아이템 수정 API **/

router.patch("/items/:itemId", async (req, res, next) => {
  const { itemId } = req.params;
  const { name, atk, def, hp, price } = req.body;

  // 해당 itemId를 가진 아이템이 존재하는지 확인
  const item = await prisma.items.findUnique({
    where: {
      itemId: +itemId, // itemId로 해당 아이템 조회
    },
  });

  // 아이템이 존재하지 않으면 404 상태 코드로 오류

  if (!item) {
    return res
      .status(404)
      .json({ message: "해당 아이템이 존재하지 않습니다." });
  }

  // 아이템 이름 중복 체크 (수정 시, 이름이 중복되면 안 되므로)

  if (name) {
    const isExistItemName = await prisma.items.findFirst({
      where: {
        name,
      },
    });

    if (isExistItemName) {
      return res
        .status(409)
        .json({ message: "이미 존재하는 아이템 이름입니다." });
    }
  }

  // 아이템 수정 (부분적으로 수정)
  const updatedItem = await prisma.items.update({
    where: {
      itemId: +itemId,
    },
    data: {
      name: name || item.name,
      atk: atk || item.atk,
      def: def || item.def,
      hp: hp || item.hp,
      price: price || item.price,
    },
  });

  return res.status(200).json({ data: updatedItem });
});

export default router;
