const endpoint = 'http://localhost:9000/graphql';

async function request(query, variables = {}) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables })
  });
  const json = await response.json();
  if (json.errors) {
    const message = json.errors.map((error) => error.message).join('\n');
    throw new Error(message);
  }
  return json.data;
}

export async function loadJob(id) {
  const query = `query JobQuery($id: ID!) {
    job(id: $id) {
      id
      title
      description
      company { id name }
    }
  }`;
  const { job } = await request(query, { id });
  return job;
}

export async function loadCompany(id) {
  const query = `query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs { id title }
    }
  }`;
  const { company } = await request(query, { id });
  return company;
}

export async function loadJobs() {
  const query = `query loadJobs {
    jobs {
      id
      title
      company { id name }
    }
  }`;
  const { jobs } = await request(query);
  return jobs;
}
