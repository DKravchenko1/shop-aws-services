import { S3CreateEvent } from 'aws-lambda';
import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import csv from 'csv-parser';

const topicArn = process.env.TOPIC_ARN;

const s3Client = new S3Client({});
const snsClient = new SNSClient({});

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
      console.log(topicArn);
      const { Body: s3Stream } = await s3Client.send(getCommand);
      const isReady = {
        parsing: [],
        moving: false,
      };

      try {
        await new Promise<void>((resolve) => {
          s3Stream // @ts-ignore
            .pipe(csv())
            .on('data', async (data: Record<string, string>) => {
              try {
                isReady.parsing.push(false);
                const command = new PublishCommand({
                  TopicArn: topicArn,
                  Message: JSON.stringify(data),
                });

                await snsClient.send(command);
                console.log('sent ->', command);
                isReady.parsing[isReady.parsing.length - 1] = true;
                isReady.parsing.every(el => el) && isReady.moving && resolve();
              } catch (err) {
                console.log(err);
              }
            })
            .on('error', err => console.log('error', err))
            .on('end', async () => {
              try {
                await s3Client.send(copyCommand);
                await s3Client.send(deleteCommand);
                console.log('end ->', isReady);
                isReady.moving = true;
                isReady.parsing.every(el => el) && isReady.moving && resolve();
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