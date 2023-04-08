import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { handler } from './get-products-list';
import { ProductServiceService } from '../../product-service-service';

describe('get-products', () => {
  const mockedResult = {
    statusCode: 1,
    body: 'string',
    headers: {
      key: 'value',
    },
  };

  beforeEach(() => {
    jest.spyOn(ProductServiceService, 'getItems').mockImplementation(() => Promise.resolve(mockedResult))
  });

  test('should make call to service and return products list', async () => {
    const result = await handler(null, null, null);

    expect(result).toBe(mockedResult);
    expect(ProductServiceService.getItems).toBeCalledTimes(1);
    expect(ProductServiceService.getItems).toBeCalledWith();
  });
});
