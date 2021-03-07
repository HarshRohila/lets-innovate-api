import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import ideaService from '@libs/services/idea';

const createIdea: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const idea = {
    title: event.body.title,
    description: event.body.description,
  };

  await ideaService.createIdea(idea);

  const response = formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });

  return response;
};

export const main = middyfy(createIdea);
