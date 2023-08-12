import { v4 as uuidv4 } from "uuid";
import path from "path";
import { Product, ProductInfo } from "../db_models/model.js";
import { where } from "sequelize";

const __dirname = path.resolve();

class ProductController {
  async create(data) {
    const { name, price, brandId, typeId, description, img } = data;
    const fileName = uuidv4() + ".jpg";

    img.mv(path.resolve(__dirname, "static", fileName));

    const product = await Product.create({
      name,
      price,
      brandId,
      typeId,
      img: fileName,
    });

    if (description) {
      // description is array
      description = JSON.parse(description);
      description.forEach((el) => {
        ProductInfo.create({
          title: el.title,
          description: el.description,
          productId: product.id,
        });
      });
    }

    return product;
  }
  async getAll(data) {
    let { brandId, typeId, limit, page } = data;
    let products = [];

    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;

    if (!brandId && !typeId) {
      products = await Product.findAndCountAll({ limit, offset });
    }

    if (brandId && !typeId) {
      products = await Product.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }

    if (!brandId && typeId) {
      products = await Product.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }

    if (brandId && typeId) {
      products = await Product.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    return products;
  }
  async getOne(id) {
    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: "info" }],
    });
    return product;
  }
  async updateOne(id, data) {
    const updatedProduct = await Product.update({...data}, { where: { id: id}})
    console.log('@updatedProduct', updatedProduct)
    return updatedProduct
  }
  async removeOne(id) {

  }
}

export default new ProductController();
