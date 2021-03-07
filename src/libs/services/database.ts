import { DynamoDB } from 'aws-sdk';

class Database {
  client: DynamoDB.DocumentClient;

  constructor() {
    this.client = new DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
      accessKeyId: 'DEFAULT_ACCESS_KEY',
      secretAccessKey: 'DEFAULT_SECRET',
    });
  }

  async insert(tableName: string, record) {
    const putInput = {
      TableName: tableName,
      Item: record,
    };

    try {
      await this.client.put(putInput).promise();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async select(tableName: string, query: string) {
    const params = {
      TableName: tableName,
      ProjectionExpression: query,
    };

    try {
      const data = await this.client.scan(params).promise();
      return data.Items;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getOperationsOnTable<T>(tableName: string) {
    return new DbOperations<T>(this, tableName);
  }
}

export class DbOperations<T> {
  constructor(private db: Database, private tableName: string) {}

  async insert(record: T) {
    await this.db.insert(this.tableName, record);
  }

  select(query: string): Promise<T[]> {
    // @ts-ignore
    return this.db.select(this.tableName, query);
  }
}

const db = new Database();
export default db;
