import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const JobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { title, type, description, company: { name, contactEmail, size },
    location: { city, state }, salary, experienceLevel, postedDate, status,
    applicationDeadline, requirements } = job;

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        throw new Error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?" + jobId
    );
    if (!confirm) return;

    deleteJob(jobId);
    navigate("/");
  };

  const onEditClick = (jobId) => {
    navigate(`/edit-job/${jobId}`)
  };

  return (
    <div className="job-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{title}</h2>
          <p>Type: {type}</p>
          <p>Description: {description}</p>
          <p>Company: </p>
          <p>Name: {name}</p>
          <p>Contact Email: {contactEmail}</p>
          <p>size: {size}</p>
          <p>Location:</p>
          <p>City: {city}</p>
          <p>State: {state}</p>
          <p>Salary: {salary}</p>
          <p>ExperienceLevel: {experienceLevel}</p>
          <p>PostedDate: {postedDate}</p>
          <p>Status: {status}</p>
          <p>ApplicationDeadline: {applicationDeadline}</p>
          <p>Requirements: {requirements}</p>

          <button onClick={() => onDeleteClick(job._id)}>delete</button>
          <button onClick={() => onEditClick(job._id)}>edit</button>
        </>
      )}
    </div>
  );
};

export default JobPage;