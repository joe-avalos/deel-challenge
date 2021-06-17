import React from 'react';
import JobsProvider from "../contexts/jobs.context";
import JobsList from "./JobsList";

const Jobs = () => {
  return (
    <JobsProvider>
      <p className="lead">Unpaid Jobs</p>
      <JobsList />
    </JobsProvider>
  );
};

export default Jobs;