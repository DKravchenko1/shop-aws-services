import { DynamoDB, GetItemCommand, ScanCommand, TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuid } from 'uuid';

const dbClient = new DynamoDB({});

export const productRepository = {
  getItemById: async ({id}) => {
    const productCommand = new GetItemCommand({
      TableName: process.env.PRODUCT_TABLE_NAME,
      Key: marshall({ id }),
    });

    const stockCommand = new GetItemCommand({
      TableName: process.env.STOCK_TABLE_NAME,
      Key: marshall({ product_id: id })
    });
    const { Item: productItem = {} } = await dbClient.send(productCommand);
    const { Item: stockItem = {} } = await dbClient.send(stockCommand);

    return { ...unmarshall(productItem), ...unmarshall(stockItem) };
  },

  getItems: async () => {
    const productCommand = new ScanCommand({
      TableName: process.env.PRODUCT_TABLE_NAME,
      ConsistentRead: true,
    });
    const stockCommand = new ScanCommand({
      TableName: process.env.STOCK_TABLE_NAME,
      ConsistentRead: true,
    });

    const { Items: productItems = [] } = await dbClient.send(productCommand);
    const { Items: stockItems = [] } = await dbClient.send(stockCommand);

    return productItems.map((el, i) => ({ ...unmarshall(el), ...unmarshall(stockItems[i]) || {} }));
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

    const command = new TransactWriteItemsCommand({
      TransactItems: [
        {
          Put: {
            TableName: process.env.PRODUCT_TABLE_NAME,
            Item: marshall(productItem)
          }
        },
        {
          Put: {
            TableName: process.env.STOCK_TABLE_NAME,
            Item: marshall(stockItem),
          }
        }
      ]
    });
    try {
      console.log(command);
      await dbClient.send(command);
      console.log('Success');
    } catch(err) {
      console.log(err);
      return { succeed: false, message: err };
    }

    return { succeed: true };
  }
};
