import { Router } from "express";
import { login, register } from "../controllers/users.controller.js";
import languageMiddleware from "middlewares/language.middleware.js";

const userRoute: Router = Router();

userRoute.post("/register", languageMiddleware("ACCOUNT_*"), register);
userRoute.get("/login", login);

export default userRoute;
