import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {ProductServiceService} from '../../product-service-service';

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  const { id, count } = JSON.parse(event?.body) || {};

  return ProductServiceService.setItemToCart(id, count);
};
