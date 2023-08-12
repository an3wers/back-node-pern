import { Router } from "express";
import brandController from "../controllers/brand.controller.js";
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
    next(ApiError.badRequest("Передайте название бренда"))
    return
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const result = await brandController.updateOne(id, data)
    if (result instanceof Error) {
      next(ApiError.badRequest(result.message))
      return
    }
    res.status(200).json(result)
  } catch (error) {
    next(ApiError.badRequest(error.message))
    return
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await brandController.removeOne(id)
    if (result instanceof Error) {
      next(ApiError.badRequest(result.message))
    }
    res.status(204).json()
  } catch (error) {
    next(ApiError.badRequest(error.message))
    return
  }
})

export default router;
