import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import createIdea from '@functions/create-idea';
import getIdeas from '@functions/get-ideas';

const TABLE_NAME = 'idea';

const serverlessConfiguration: AWS = {
  service: 'lets-innovate-api',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        migrate: true,
      },
    },
  },
  resources: {
    Resources: {
      [TABLE_NAME]: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: TABLE_NAME,
          AttributeDefinitions: [
            {
              AttributeName: 'title',
              AttributeType: 'S',
            },
            {
              AttributeName: 'description',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'title',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'description',
              KeyType: 'string',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
  plugins: ['serverless-webpack', 'serverless-dynamodb-local', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello, createIdea, getIdeas },
};

module.exports = serverlessConfiguration;
