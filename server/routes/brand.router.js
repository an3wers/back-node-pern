import { Router } from "express";
import brandController from "../controllers/barnd.controller.js";
import ApiError from "../error/apiError.js";

const router = Router();

router.get("/", async (req, res) => {
  const result = await brandController.getAll()
  res.json(result)
});

router.post("/", async (req, res, next) => {
  const data = req.body;
  if ("name" in data) {
    const result = await brandController.create(data);
    res.status(201).json(result.dataValues);
  } else {
    return next(ApiError.badRequest("Передайте название бренда"));
  }
});

export default router;
