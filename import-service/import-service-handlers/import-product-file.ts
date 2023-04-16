import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const handler = async (event: APIGatewayProxyEventV2) => {
  const s3 = new S3Client({});
  const { UPLOADED_BUCKET_NAME } = process.env;
  const { name: key } = event.queryStringParameters;

  const command = new PutObjectCommand({
    Bucket: UPLOADED_BUCKET_NAME,
    Key: `uploaded/${key}`,
  });

  const url = await getSignedUrl(s3, command);

  return {
    statusCode: 202,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
    body: url,
  };
};
