import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function checkRoleHandler(role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.autorization.split(" ")[1]; // Bearer kajshdfkjhds
      if (!token) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (decoded.role !== role) {
        res.status(403).json({ message: "Нет доступа" });
      }

      req.user = decoded;

      next();
    } catch (error) {
      res.status(401).json({ message: "Не авторизован" });
    }
  };
}

export default checkRoleHandler;
