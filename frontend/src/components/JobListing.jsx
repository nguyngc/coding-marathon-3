import { Link } from "react-router-dom";

const JobListing = ({ job }) => {
  const { title, type, description, company } = job;

  return (
    <div className="job-preview">
      <h2>{title}</h2>
      <p>Type: {type}</p>
      <p>Description: {description}</p>
      <p>Company: {company.name} {company.contactEmail} {company.size}</p>
      <Link to={`/jobs/${job._id}`}>View Job</Link>
    </div>
  );
};

export default JobListing;
