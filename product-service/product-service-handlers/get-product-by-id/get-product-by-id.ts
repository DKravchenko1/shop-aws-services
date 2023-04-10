import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {ProductServiceService} from '../../product-service-service';

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  console.log(`incoming data -> ${event.queryStringParameters}`);

  return ProductServiceService.getItemById(event);
};
