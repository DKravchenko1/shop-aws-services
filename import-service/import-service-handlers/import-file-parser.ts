import { Api } from 'aws-sdk/clients/apigatewayv2';

export const handler = (event: Api) => {
  try {
    console.log(event);

    return {
      statusCode: 200,
      body: JSON.stringify(event),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
}