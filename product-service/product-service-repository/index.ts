import { DynamoDB } from 'aws-sdk'
import { v4 as uuid } from 'uuid';

const dbClient = new DynamoDB.DocumentClient();

export const productRepository = {
  getItemById: async (id: string) => {
    const { Item: productItem = {} } = await dbClient.get({
      TableName: process.env.PRODUCT_TABLE_NAME,
      Key: { id: id }
    }).promise();

    const { Item: stockItem = {} } = await dbClient.get({
      TableName: process.env.STOCK_TABLE_NAME,
      Key: { product_id: id }
    }).promise();

    return { ...productItem, ...stockItem };
  },

  getItems: async () => {
    const { Items: productItems = [] } = await dbClient.scan({
      TableName: process.env.PRODUCT_TABLE_NAME,
    }).promise();

    const { Items: stockItems = [] } = await dbClient.scan({
      TableName: process.env.STOCK_TABLE_NAME,
    }).promise();

    return productItems.map((el, i) => ({ ...el, ...stockItems[i] || {} }));
  },

  setItemToCart: async (id: string, count: number) => {
    const { Item: stockItem } = await dbClient.get({
      TableName: process.env.STOCK_TABLE_NAME,
      Key: { product_id: id },
    }).promise();

    if (stockItem.count > count) {
      await dbClient.put({
        TableName: process.env.CART_TABLE_NAME,
        Item: { product_id: id, count },
      }).promise();
    } else {
      throw new Error('Stock does not contain such amount of items');
    }
  },

  createItem: async({ count, title, description, price }) => {
    const productItem = {
      id: uuid(),
      title,
      description,
      price,
    };

    const stockItem = {
      product_id: productItem.id,
      count,
    };

    await dbClient.transactWrite({
      TransactItems: [
        {
          Put: {
            TableName: process.env.PRODUCT_TABLE_NAME,
            Item: productItem
          }
        },
        {
          Put: {
            TableName: process.env.STOCK_TABLE_NAME,
            Item: stockItem,
          }
        }
      ],
    }, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);         // successful response
    }).promise();

    console.log('item successfully created');
    return { result: 'success' };
  }
};
