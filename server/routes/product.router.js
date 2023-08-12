import { Router } from "express";
import productController from "../controllers/product.controller.js";
import ApiError from "../error/apiError.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { brandId, typeId, limit, page } = req.query;
    const result = await productController.getAll({
      brandId,
      typeId,
      limit,
      page,
    });
    res.status(200).json(result);
  } catch (error) {
    next(ApiError.badRequest(error.message));
    return;
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, price, brandId, typeId, description } = req.body;
    const { img } = req.files;
    const result = await productController.create({
      name,
      price,
      brandId,
      typeId,
      description,
      img,
    });
    res.status(201).json(result);
  } catch (error) {
    next(ApiError.badRequest(error.message));
    return;
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await productController.getOne(id);
    result ? res.json(result) : res.send(404)
  } catch (error) {
    next(ApiError.badRequest(error.message));
    return;
  }
});

export default router;
