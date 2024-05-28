class CandidateRepository {
  constructor(db) {
    this.db = db;
    this.collection = 'candidates';
  }
}

export default CandidateRepository;
