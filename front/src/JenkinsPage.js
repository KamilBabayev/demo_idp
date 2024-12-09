import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JenkinsPage() {
  const [jenkinsItems, setJenkinsItems] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [ipAddress, setIpAddress] = useState('');
  const [dnsName, setDnsName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/jenkins/items');
        setJenkinsItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleJobRun = async (jobName) => {
    try {
      // Replace with your actual API endpoint for running jobs
      await axios.post(`http://localhost:5000/jenkins/run_job/${jobName}`);
      console.log(`Job "${jobName}" triggered successfully!`);
    } catch (error) {
      console.error('Error running job:', error);
    }
  };

  const handleParametrizedJobRun = async (jobName, ipAddress, dnsName) => {
    try {
      // Replace with your actual API endpoint for running jobs with parameters
      const response = await axios.post(`http://localhost:5000/jenkins/run_pjob/${jobName}`, {
        ipAddress,
        dnsName,
      });
      console.log(response.data); // Optional: Log response data for debugging
      console.log(`Parametrized Job "${jobName}" triggered successfully!`);
    } catch (error) {
      console.error('Error running job:', error);
    }
  };

  const dropdownOptions = jenkinsItems.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  return (
    <div className="shift-right">
      <h1>Jenkins Page</h1>


      <table className="table-container" style={{ borderCollapse: 'collapse' }}> {/* Add borderCollapse style */}
        <thead>
          <tr>
            <th> Item Name </th>
            <th> Item Color </th>
            <th> Item URL </th>
          </tr>
        </thead>
        <tbody>
          {jenkinsItems.map((item) => (
            <tr key={item.id} style={{ border: '1px solid #ddd' }}> {/* Add border style */}
              <td>{item.name}</td>
              <td>{item.color}</td>
              <td><a href={item.url}>{item.url}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <br/>
      <br/>
      <select className="custom-dropdown" value={selectedJob} onChange={(event) => setSelectedJob(event.target.value)}>
        <option value="">Select Job</option>
        {dropdownOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <br/>
      <button className="run-job-button" disabled={!selectedJob} onClick={() => handleJobRun(selectedJob)}>
        Run Job
      </button>
      <br/>
      <br/>
      <br/>
      <select className="custom-dropdown" value={selectedJob} onChange={(event) => setSelectedJob(event.target.value)}>
        <option value="">Select Job</option>
        {dropdownOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <br/>
      <button className="run-job-button" disabled={!selectedJob} onClick={() => handleParametrizedJobRun(selectedJob, ipAddress, dnsName)}>
        Run Parametrized Job
      </button>
      <br/>
      <br/>
      <br/>


      <table className="table-container" style={{ borderCollapse: 'collapse' }}>
        {/* ... (existing table code) ... */}
      </table>
      <br />
      <br />
      <br />

      <select
        className="custom-dropdown"
        value={selectedJob}
        onChange={(event) => setSelectedJob(event.target.value)}
      >
        <option value="">Select Job</option>
        {dropdownOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <br />

      {/* Input fields for IP address and DNS name */}
      <label htmlFor="ipAddress">IP Address:</label>
      <input
        type="text"
        id="ipAddress"
        value={ipAddress}
        onChange={(event) => setIpAddress(event.target.value)}
        placeholder="Enter IP address"
      />
      <br />

      <label htmlFor="dnsName">DNS Name:</label>
      <input
        type="text"
        id="dnsName"
        value={dnsName}
        onChange={(event) => setDnsName(event.target.value)}
        placeholder="Enter DNS name"
      />
      <br />

      <button
        className="run-job-button"
        disabled={!selectedJob || !ipAddress || !dnsName}
        onClick={() => handleParametrizedJobRun(selectedJob, ipAddress, dnsName)}
      >
        Run Parametrized Job
      </button>
      <br />
      <br />
      <br />
      
    </div>
  );
}

export default JenkinsPage;