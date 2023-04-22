import { SQSEvent } from 'aws-lambda';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { productRepository } from '../../product-service-repository';

export const handler = async (event: SQSEvent) => {
  const snsClient = new SNSClient({});
  const { Records: records } = event;
  const { TOPIC_ARN } = process.env;

  await Promise.all(records.map(async (record) => {
    const { Message: message } = JSON.parse(record.body);
    const parsedMessage = JSON.parse(message);
    const result = await productRepository.createItem(parsedMessage);

    const emailParams = {
      Message: message,
      TopicArn: TOPIC_ARN,
    };

    console.log('result -> ', result);
    console.log ('email -> ', emailParams);
    console.log('parsedMessage -> ', parsedMessage);
    const command = new PublishCommand(emailParams);

    await snsClient.send(command);

    console.log ('the email sent');
  }));

  return { statusCode: 200 };
}
