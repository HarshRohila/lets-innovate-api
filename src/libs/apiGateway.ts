import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (response: unknown, statusCode = 200) => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};

export const errorResponse = (statusCode: number, ...errorMsgs: string[]) => {
  return formatJSONResponse({ errors: errorMsgs }, statusCode);
};

export const defaultErrorResponse = () => {
  return errorResponse(500, 'Internal Server Error');
};
