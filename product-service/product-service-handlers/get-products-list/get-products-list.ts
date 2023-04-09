import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {ProductServiceService} from '../../product-service-service';

export const handler: APIGatewayProxyHandlerV2 = async () => {
  return ProductServiceService.getItems();
};
