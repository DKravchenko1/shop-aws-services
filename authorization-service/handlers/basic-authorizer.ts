import { APIGatewayRequestAuthorizerEventV2 } from 'aws-lambda';

export const handler = async (event: APIGatewayRequestAuthorizerEventV2) => {
  const { headers } = event;
  const { authorization: token } = headers;
  console.log('event -> ', event);

  const user = Buffer.from(token?.split(' ')[1], 'base64')?.toString() || '';

  const [userKey, userPass] = user?.split(':');

  return {
    isAuthorized: process.env[userKey] === userPass,
  };
}
