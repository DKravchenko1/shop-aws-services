import { productRepository } from '../product-service-repository';
import { IService } from '../product-service-types';
import { getInternalError, getNoFoundError, getResult } from '../product-service-utils';

export const ProductServiceService: IService = {
  getItemById: async (event) => {
    try {
      const { id } = event?.pathParameters;
      const item = await productRepository.getItemById(id);

      if (!item) {
        return getNoFoundError();
      }

      return getResult(item);
    } catch (e) {
      return getInternalError(e);
    }
  },

  getItems: async () => {
    try {
      const items = await productRepository.getItems();

      if (!items?.length) {
        return getNoFoundError();
      }
      return getResult(items);
    } catch (e) {
      return getInternalError(e);
    }
  },
}