import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { handler } from './get-product-by-id';
import { ProductServiceService } from '../../product-service-service';

describe('get-product-by-id', () => {
  const mockedResult = {
    statusCode: 1,
    body: 'string',
    headers: {
      key: 'value',
    }
  };

  beforeEach(() => {
    jest.spyOn(ProductServiceService, 'getItemById').mockImplementation(() => Promise.resolve(mockedResult))
  });

  test('should make call to service and return product by id', async () => {
    const mockedEvent = {queryStringParameters: {id: '1'}} as unknown as APIGatewayProxyEventV2;
    const result = await handler(mockedEvent, null, null);

    expect(result).toBe(mockedResult);
    expect(ProductServiceService.getItemById).toBeCalledTimes(1);
    expect(ProductServiceService.getItemById).toBeCalledWith(mockedEvent);
  });
});
