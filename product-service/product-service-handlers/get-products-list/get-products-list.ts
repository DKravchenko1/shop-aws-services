import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {ProductServiceService} from '../../product-service-service';

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event);
  return ProductServiceService.getItems();
};
