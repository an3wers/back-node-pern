import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function authHandler(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.autorization.split(" ")[1]; // Bearer kajshdfkjhds
    if (!token) {
      res.status(401).json({ message: "Не авторизован" });
      return
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Не авторизован" });
    return
  }
}

export default authHandler;
