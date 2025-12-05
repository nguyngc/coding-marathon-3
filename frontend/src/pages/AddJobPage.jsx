import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyContactEmail, setCompanyContactEmail] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [locationState, setLocationState] = useState("");
  const [salary, setSalary] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Entry"); // default Entry
  const [status, setStatus] = useState("open"); // default open
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [requirements, setRequirements] = useState("");

  const navigate = useNavigate();

  const addJob = async (newJob) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentUser?.token}`
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) throw new Error("Failed to add job");
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const newJob = {
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail: companyContactEmail,
        size: companySize,
      },
      location: {
        city: locationCity,
        state: locationState,
      },
      salary,
      experienceLevel,
      status,
      applicationDeadline,
      requirements: requirements,
    };

    addJob(newJob);
    navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input type="text" required value={title} onChange={e => setTitle(e.target.value)} />

        <label>Job type:</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea required value={description} onChange={e => setDescription(e.target.value)} />

        <label>Company Name:</label>
        <input type="text" required value={companyName} onChange={e => setCompanyName(e.target.value)} />

        <label>Contact Email:</label>
        <input type="email" required value={companyContactEmail} onChange={e => setCompanyContactEmail(e.target.value)} />

        <label>Size:</label>
        <input type="number" value={companySize} onChange={e => setCompanySize(e.target.value)} />

        <label>City:</label>
        <input type="text" required value={locationCity} onChange={e => setLocationCity(e.target.value)} />

        <label>State:</label>
        <input type="text" required value={locationState} onChange={e => setLocationState(e.target.value)} />

        <label>Salary:</label>
        <input type="number" required value={salary} onChange={e => setSalary(e.target.value)} />

        <label>Experience Level:</label>
        <select value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)}>
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>

        <label>Status:</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        <label>Application Deadline:</label>
        <input type="date" value={applicationDeadline} onChange={e => setApplicationDeadline(e.target.value)} />

        <label>Requirements (comma separated):</label>
        <input type="text" value={requirements} onChange={e => setRequirements(e.target.value)} />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;