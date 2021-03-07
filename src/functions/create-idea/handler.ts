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

  return formatJSONResponse(idea, 201);
};

export const main = middyfy(createIdea);
