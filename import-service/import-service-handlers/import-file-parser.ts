import { S3CreateEvent } from 'aws-lambda';
import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import csv from 'csv-parser';

const s3Client = new S3Client({});

export const handler = async (event: S3CreateEvent) => {
  try {
    const { Records: records } = event;

    await Promise.all(records.map(async (record) => {
      const params = {
        Bucket: record.s3.bucket.name,
        Key: record.s3.object.key,
      };
      const getCommand = new GetObjectCommand(params);
      const copyCommand = new CopyObjectCommand({
        Bucket: params.Bucket,
        Key: record.s3.object.key.replace('upload', 'parsed'),
        CopySource: params.Bucket + '/' + params.Key,
      });
      const deleteCommand = new DeleteObjectCommand(params);

      const { Body: s3Stream } = await s3Client.send(getCommand);

      try {
        await new Promise<void>((resolve) => {
          s3Stream // @ts-ignore
            .pipe(csv())
            .on('data', data => console.log('data on', data))
            .on('error', err => console.log('error', err))
            .on('end', async () => {
              try {
                await s3Client.send(copyCommand);
                await s3Client.send(deleteCommand);
                resolve();
              } catch (err) {
                console.log('end ->', err);
              }
            });
        });
      }
      catch (err) {
        console.log(err);
      }
    }));

    return {
      statusCode: 202,
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
}