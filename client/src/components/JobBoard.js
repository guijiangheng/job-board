import React from 'react';
import JobList from './JobList';
import { jobs } from '../fake-data/data';

export default function JobBoard() {
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}
