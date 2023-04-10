import { BatchWriteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { v4 as uuid } from 'uuid';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  REGION,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  SESSION_TOKEN,
  PRODUCT_TABLE_NAME,
  STOCK_TABLE_NAME
} = process.env;

const dynamoDB = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    sessionToken: SESSION_TOKEN,
    secretAccessKey: SECRET_ACCESS_KEY,
  }
});

const uuidArray = [uuid(), uuid(), uuid(), uuid(), uuid()];

const params = {
  RequestItems: {
    [PRODUCT_TABLE_NAME]: [
      {
        PutRequest: {
          Item: {
            'id': {'S': `${uuidArray[0]}`},
            'title': {'S': 'entity-1'},
            'description': {'S': 'entity-description-1'},
            'price': {'N': '1'}
          }
        }
      },
      {
        PutRequest: {
          Item: {
            'id': {'S': `${uuidArray[1]}`},
            'title': {'S': 'entity-2'},
            'description': {'S': 'entity-description-2'},
            'price': {'N': '2'}
          }
        }
      },
      {
        PutRequest: {
          Item: {
            'id': {'S': `${uuidArray[2]}`},
            'title': {'S': 'entity-3'},
            'description': {'S': 'entity-description-3'},
            'price': {'N': '3'}
          }
        }
      },
      {
        PutRequest: {
          Item: {
            'id': {'S': `${uuidArray[3]}`},
            'title': {'S': 'entity-4'},
            'description': {'S': 'entity-description-4'},
            'price': {'N': '4'}
          }
        }
      },
      {
        PutRequest: {
          Item: {
            'id': {'S': `${uuidArray[4]}`},
            'title': {'S': 'entity-5'},
            'description': {'S': 'entity-description-5'},
            'price': {'N': '5'}
          }
        }
      },
    ],
    [STOCK_TABLE_NAME]: [
      {
        PutRequest: {
          Item: {
            'product_id': {'S': `${uuidArray[0]}`},
            'count': {'N': '1'},
          }
        }
      },
      {
        PutRequest: {
          Item: {
            'product_id': {'S': `${uuidArray[1]}`},
            'count': {'N': '2'},
          }
        }
      },
      {
        PutRequest: {
          Item: {
            'product_id': {'S': `${uuidArray[2]}`},
            'count': {'N': '3'},
          }
        }
      },
      {
        PutRequest: {
          Item: {
            'product_id': {'S': `${uuidArray[3]}`},
            'count': {'N': '4'},
          }
        }
      },
      {
        PutRequest: {
          Item: {
            'product_id': {'S': `${uuidArray[4]}`},
            'count': {'N': '5'},
          }
        }
      },
    ],
  },
}

const command = new BatchWriteItemCommand(params);

console.log(PRODUCT_TABLE_NAME)
console.log(STOCK_TABLE_NAME);

const script = async () => {
  await dynamoDB.send(command);
}

script();