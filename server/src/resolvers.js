const db = require('./db');

const Query = {
  jobs: () => db.jobs.list(),
  job: (_, { id }) => db.jobs.get(id),
  company: (_, { id }) => db.companies.get(id)
};

const Job = {
  company: (job) => db.companies.get(job.companyId)
};

const Company = {
  jobs: (company) => db.jobs.list()
    .filter((job) => job.companyId === company.id)
};

module.exports = { Query, Job, Company };
