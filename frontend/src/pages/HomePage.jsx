import { useState, useEffect } from 'react';
import JobListings from "../components/JobListings";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      console.log(data);
      setJobs(data);
    }

    fetchData();
  }, []);

  return (
    <div className="home">
      <JobListings jobs={jobs}  />
    </div>
  );
};

export default Home;
