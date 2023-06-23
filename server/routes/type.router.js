import { Router } from "express";
import typeController from "../controllers/type.controller.js";
import ApiError from "../error/apiError.js";
import ckeckRoleMiddleware from '../middleware/ckeckRoleMiddleware.js'

const router = Router();

router.get("/", async (req, res) => {
  const result = await typeController.getAll()
  res.json(result)
});
router.post("/", ckeckRoleMiddleware('admin'), async (req, res, next) => {
  const data = req.body;
  if ("name" in data) {
    const result = await typeController.create(data);
    res.status(201).json(result.dataValues);
  } else {
    return next(ApiError.badRequest("Передайте название категории"));
  }
});

export default router;
