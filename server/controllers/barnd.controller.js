import { Brand } from "../db_models/model.js";

class BrandController {
  async create(data) {
    const brand = await Brand.create(data);
    return brand;
  }
  async getAll() {
    const brands = await Brand.findAll();
    return brands;
  }
}

export default new BrandController();
