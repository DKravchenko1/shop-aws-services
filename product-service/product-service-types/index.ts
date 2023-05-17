export type ProductDTO = {
  count: number;
  description: string;
  title: string;
  price: number;
}

export type ProductEntity = ProductDTO & {
  id: string;
};

export type Response = {
  statusCode: number;
  body: string;
  headers: Record<string, string | boolean>;
}

export interface IService {
  getItemById: (APIGatewayProxyEventV2) => Promise<Response>;
  getItems: () => Promise<Response>;
  createItem: (data: ProductDTO) => Promise<Response>;
}
