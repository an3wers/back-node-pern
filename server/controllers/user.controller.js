import bcrypt from "bcrypt";
import { User, Basket } from "../db_models/model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async register(data) {
    const candidate = await User.findOne({ where: { email: data.email } });

    if (candidate) {
      throw new Error("Пользователь уже существует");
    }

    const hashPassword = await bcrypt.hash(data.password, 5);
    const user = await User.create({
      email: data.email,
      role: data.role,
      password: hashPassword,
    });

    await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);

    return { token };
  }

  async login(data) {
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      throw new Error("Такого пользователя нет");
    }

    const comparePassword = bcrypt.compareSync(data.password, user.password);
    if (!comparePassword) {
      throw new Error("Введены некорректные данные");
    }

    const token = generateJwt(user.id, user.email, user.role);
    return { token };
  }

  async getUser(user) {
    const { id, email, role } = user;
    const token = generateJwt(id, email, role);
    return { token };
  }
  
  async logout() {}
  
  async remove() {}
}

export default new UserController();
