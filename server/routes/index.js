import { Router } from "express";
import productRouter from "./product.router.js";
import userRouter from "./user.router.js";
import typeRouter from "./type.router.js";
import brandRouter from "./brand.router.js";

const router = Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/product", productRouter);

export default router;
