export type ProductEntity = {
  id: string;
  count: number;
  description: string;
  title: string;
  price: number;
};

export type Response = {
  statusCode: number;
  body: string;
  headers: Record<string, string>;
}

export interface IService {
  getItemById: (APIGatewayProxyEventV2) => Promise<Response>;
  getItems: () => Promise<Response>;
}
