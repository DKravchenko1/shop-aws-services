import { describe, expect, jest, test } from '@jest/globals';
import { afterAll } from 'jest-circus';
import { handler } from './import-product-file';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

const mockPutObjectCommand = jest.fn().mockImplementation(() => 'put-object-command');
const mockGetSignedUrl = jest.fn().mockImplementation(() => Promise.resolve('get-signed-url'))
const mockedS3 = jest.fn().mockImplementation(() => 'mocked-s3');

jest.mock('@aws-sdk/client-s3', () => {
  const originalModule: any = jest.requireActual('@aws-sdk/client-s3')
  class MockedPutObjectCommand {
    constructor() {
      return mockPutObjectCommand;
    }
  }

  class MockedS3 {
    constructor() {
      return mockedS3;
    }
  }

  return {
    ...originalModule,
    S3Client: MockedS3,
    PutObjectCommand: MockedPutObjectCommand
  }
});

jest.mock('@aws-sdk/s3-request-presigner', () => {
  const originalModule: any = jest.requireActual('@aws-sdk/s3-request-presigner');
  class MockedPresigner {
    constructor() {
      return jest.fn();
    }
  }

  return {
    ...originalModule,
    Presigner: MockedPresigner,
    getSignedUrl: (...args) => mockGetSignedUrl(...args),
  }
});

describe('import-product-file', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should create and return signed url', async () => {
    const mockedEvent = {queryStringParameters: {name: 'mockedName'}} as unknown as APIGatewayProxyEventV2;
    const result = await handler(mockedEvent);

    expect(mockGetSignedUrl).toHaveBeenCalledTimes(1);
    expect(mockGetSignedUrl).toHaveBeenCalledWith(mockedS3, mockPutObjectCommand);

    expect(result.statusCode).toBe(202);
    expect(result.body).toBe('get-signed-url');
  });
});