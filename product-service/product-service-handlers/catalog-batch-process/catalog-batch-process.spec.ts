import { describe, expect, jest, test } from '@jest/globals';
import { handler } from './catalog-batch-process';
import { SQSEvent } from 'aws-lambda';

const mockedSend = jest.fn().mockImplementation(() => Promise.resolve());
const mockedCreateItem = jest.fn().mockImplementation(() => Promise.resolve());
const mockedPublishCommand = jest.fn().mockImplementation(() => Promise.resolve());

jest.mock('@aws-sdk/client-sns', () => {
  const originalModule: any = jest.requireActual('@aws-sdk/client-sns')
  class MockedPublishCommand {
    constructor() {
      return mockedPublishCommand;
    }
  }

  class MockedSnsClient {
    constructor() {
      return {
        send: mockedSend
      };
    }
  }

  return {
    ...originalModule,
    SNSClient: MockedSnsClient,
    PublishCommand: MockedPublishCommand
  }
});

jest.mock('../../product-service-repository', () => ({
  productRepository: {
    createItem: (...args) => mockedCreateItem(...args),
  }
}));

describe('catalog-batch-process', () => {
  test('should call createItem', async () => {
    const item = {
      title: 'mocked-title',
      description:'mocked-description',
      price: 100,
      count: 10,
    };

    const event = {
      Records: [
        {
          body: JSON.stringify({
            Message: JSON.stringify(item),
          }),
        }
      ]
    } as SQSEvent;
    const result = await handler(event);

    expect(result).toStrictEqual({
      statusCode: 200,
    });
    expect(mockedCreateItem).toHaveBeenCalledTimes(1);
    expect(mockedCreateItem).toHaveBeenCalledWith(item);

    expect(mockedSend).toHaveBeenCalledTimes(1);
    expect(mockedSend).toHaveBeenCalledWith(mockedPublishCommand);
  });
});


