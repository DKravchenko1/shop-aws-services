import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {ProductServiceService} from '../../product-service-service';
import { getValidationError } from '../../product-service-utils';

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2,
  context,
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(`incoming data -> ${event?.body}`);
  const { title, description, count, price } = JSON.parse(event?.body) || {};
  if (!title || !description || !count || !price) {
    return getValidationError('one of the property is incorrect');
  }

  return ProductServiceService.createItem({ title, description, count, price });
};
