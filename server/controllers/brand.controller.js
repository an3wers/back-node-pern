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
  async updateOne(id, data) {
    const updatedBrandIds = await Brand.update(
      { ...data, updatedAt: Date.now() },
      { where: { id: id } }
    );

    if (updatedBrandIds[0] === 0) {
      return new Error("Бренд с таким id не найден");
    }
    const updatedBrand = await Brand.findByPk(id);
    return updatedBrand;
  }
  async removeOne(id) {
    const deletedId = await Brand.destroy({ where: { id: id } });
    if (deletedId === 0) {
      return new Error("Бренд с таким id не найден");
    }
    return deletedId
  }
}

export default new BrandController();
