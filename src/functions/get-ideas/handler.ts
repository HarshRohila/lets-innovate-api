import 'source-map-support/register';

import { defaultErrorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import ideaService from '@libs/services/idea';
import Idea from '@libs/daos/idea';

const createIdea: ValidatedEventAPIGatewayProxyEvent<Idea> = async () => {
  let ideas: Idea[];

  try {
    ideas = await ideaService.getIdeas();
  } catch (error) {
    console.error(error);
    return defaultErrorResponse();
  }

  const response = formatJSONResponse(ideas);

  return response;
};

export const main = middyfy(createIdea);
