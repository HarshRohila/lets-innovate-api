import Idea from '@libs/daos/idea';
import db, { DbOperations } from './database';

class IdeaService {
  db: DbOperations<Idea>;

  constructor() {
    this.db = db.getOperationsOnTable<Idea>('idea');
  }

  async createIdea(idea: Idea) {
    await this.db.insert(idea);
  }

  getIdeas() {
    return this.db.select('title, description');
  }
}

const ideaService = new IdeaService();
export default ideaService;
