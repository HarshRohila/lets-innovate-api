import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import ideaService from '@libs/services/idea';
import Idea from '@libs/daos/idea';

const createIdea: ValidatedEventAPIGatewayProxyEvent<Idea> = async () => {
  const ideas = await ideaService.getIdeas();

  // @ts-ignore
  const response = formatJSONResponse(ideas);

  return response;
};

export const main = middyfy(createIdea);
