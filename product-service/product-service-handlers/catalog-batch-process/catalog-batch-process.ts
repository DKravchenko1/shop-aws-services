import { SQSEvent } from 'aws-lambda';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { productRepository } from '../../product-service-repository';

export const handler = async (event: SQSEvent) => {
  const snsClient = new SNSClient({});
  const { Records: records } = event;
  const { TOPIC_ARN } = process.env;

  console.log('Catalog Batch Process Started', records);

  const messages = await Promise.all(records.map(async (record) => {
    const { Message: message } = JSON.parse(record.body);
    const parsedMessage = JSON.parse(message);
    return new Promise((resolve, reject) => {
      productRepository.createItem(parsedMessage)
        .then(() => resolve(parsedMessage))
        .catch((e) => reject(e));
    });
  })).catch((err) => console.log('error on creating Items', err));

  const emailParams = {
    Message: JSON.stringify(messages[0]),
    TopicArn: TOPIC_ARN,
  };

  const command = new PublishCommand(emailParams);

  await snsClient.send(command);

  return { statusCode: 200 };
}
