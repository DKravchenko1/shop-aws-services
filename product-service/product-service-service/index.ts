import { productRepository } from '../product-service-repository';
import { IService, ProductDTO } from '../product-service-types';
import { getInternalError, getNoFoundError, getResult } from '../product-service-utils';

export const ProductServiceService: IService = {
  getItemById: async (id) => {
    const item = await productRepository.getItemById(id);

    if (!item) {
      return getNoFoundError();
    }

    console.log('getItemById:item ->', item);

    return getResult(item);
  },

  getItems: async () => {
    try {
      const items = await productRepository.getItems() || [];
      console.log('items');
      const itemsLength = items?.length;
      if (!itemsLength) {
        return getNoFoundError();
      }
      console.log('items', items);
      return getResult(items);
    } catch (e) {
      console.log(e);
      return getInternalError(e);
    }
  },

  createItem: async (productDTO: ProductDTO) => {
    try {
      const result = await productRepository.createItem(productDTO);
      return getResult(result);
    } catch (e) {
      console.log(e);
      throw getInternalError(e);
    }
  },
}