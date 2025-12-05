import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const JobPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteJob = async (id) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${currentUser?.token}` }
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
        console.log(data);
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
          <h2>{job.title}</h2>
          <p>Type: {job.type}</p>
          <p>Description: {job.description}</p>
          <p>Company: </p>
          <p>Name: {job.company?.name}</p>
          <p>Contact Email: {job.company?.contactEmail}</p>
          <p>size: {job.company?.size}</p>
          <p>Location:</p>
          <p>City: {job.location.city}</p>
          <p>State: {job.location.state}</p>
          <p>Salary: {job.salary}</p>
          <p>Experience Level: {job.experienceLevel}</p>
          <p>Posted Date: {new Date(job.postedDate).toLocaleDateString("vi-VN")}</p>
          <p>Status: {job.status}</p>
          <p>Application Deadline: {new Date(job.applicationDeadline).toLocaleDateString("vi-VN")}</p>
          <p>Requirements: {job.requirements}</p>
          {isAuthenticated && (
            <>
              <button onClick={() => onDeleteClick(job._id)}>delete</button>
              <button onClick={() => onEditClick(job._id)}>edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default JobPage;