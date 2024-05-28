class JobRepository {
  constructor(db) {
    this.db = db;
    this.collection = 'jobs';
  }
}

export default JobRepository;
