import { entities } from "./mock.json";
import { ProductEntity } from "../product-service-types";

export const productRepository = {
  getItemById: async (id: string) => {
    return await entities.find((entity: ProductEntity) => entity.id === id);
  },

  getItems: async () => {
    return [...entities];
  },
};
