import React from 'react';
import JobsProvider from "../contexts/jobs.context";
import JobsList from "./JobsList";

const Jobs = () => {
  return (
    <JobsProvider>
      <h1>Unpaid Jobs</h1>
      <JobsList />
    </JobsProvider>
  );
};

export default Jobs;