import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import {ProductServiceService} from '../../product-service-service';

export const handler: (event: APIGatewayProxyEventV2, context: Context) => Promise<any> = async (
  event: APIGatewayProxyEventV2,
  context: Context,
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(`incoming data -> ${JSON.stringify(event)}`);
  const { id } = event.pathParameters;
  return ProductServiceService.getItemById(id);
};
