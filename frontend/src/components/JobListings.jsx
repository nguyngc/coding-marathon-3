import JobListing from "./JobListing";

const JobListings = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.length === 0 ? (
        <p>There is no job available now.</p>
      )
      :
      (jobs.map(job => (
        <JobListing key={job._id} job={job} />
      )))}
    </div>
  );
};

export default JobListings;
