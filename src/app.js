// src/app.js

import express from "express";
import cookieParser from "cookie-parser";
import AccountsRouter from "./routes/accounts.router.js";
import LogMiddleware from "./middlewares/log.middleware.js";
import ErrorHandlingMiddleware from "./middlewares/error-handling.middleware.js";
import CharactersRouter from "./routes/characters.router.js";
import ItemsRouter from "./routes/items.router.js";

const app = express();
const PORT = 3001;

app.use(LogMiddleware);
app.use(express.json());
app.use(cookieParser());

app.use("/api", [AccountsRouter, CharactersRouter, ItemsRouter]);
app.use(ErrorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
