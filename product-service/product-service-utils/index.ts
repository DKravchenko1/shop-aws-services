import {headers} from '../product-service-constants';

export const getNoFoundError = () => {
  return {
    statusCode: 404,
    body: 'Product item is not found',
    headers,
  }
}

export const getInternalError = (e) => {
  return {
    statusCode: 501,
    body: JSON.stringify(e),
    message: "Internal server error",
    headers,
  };
}

export const getResult = (result) => {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(result),
  }
}

export const getValidationError = (error) => {
  return {
    statusCode: 400,
    headers,
    message: error,
  }
}