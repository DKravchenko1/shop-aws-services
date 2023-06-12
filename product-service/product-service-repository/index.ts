import { v4 as uuid } from 'uuid';
import { sequelize } from './sequelize';
import { ProductItemModel } from '../product-service-models/product-item.model';

export const productRepository = {
  getItemById: async (id) => {
    try {
      await sequelize.authenticate();
      return await ProductItemModel.findOne({
        where: {
          id: id,
        }
      });
    } catch (err) {
      console.log(err);
      throw err;
    }

  },

  getItems: async (): Promise<ProductItemModel[]> => {
    try {
      await sequelize.authenticate();
      return (await ProductItemModel.findAll()).map(el => ({ ...el.get()}));
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createItem: async({ count, title, description, price }) => {
    try {
      await ProductItemModel.create({
        id: uuid(),
        count,
        title,
        description,
        price,
      })
      return { success: true };
    } catch (error) {
      console.error(error);
      throw error;
    }

  },
};
