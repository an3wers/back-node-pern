import { Router } from "express";
import userController from "../controllers/user.controller.js";
import ApiError from "../error/apiError.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", async (req, res, next) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Некорректные данные");
    }
    const result = await userController.register({ email, password, role });
    res.status(201).json(result); // if success -> result - token 
  } catch (error) {
    next(ApiError.badRequest(error.message));
    return
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await userController.login({ email, password });
    res.send(result);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
});

router.get("/auth", authMiddleware, async (req, res, next) => {
  const token = await userController.getUser({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role,
  });
  if (token) {
    res.status(200).json({ data: req.user, message: "" });
  } else {
    return next(ApiError.badRequest("Пользователя не существует"));
  }
});

export default router;
