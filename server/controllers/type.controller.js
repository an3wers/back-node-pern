import { Type } from "../db_models/model.js";

class TypeController {
  async create(data) {
    const type = await Type.create(data); // data = {name: 'name'}
    return type;
  }
  async getAll() {
    const types = await Type.findAll();
    return types;
  }
}

export default new TypeController();
