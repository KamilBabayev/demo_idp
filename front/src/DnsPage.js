import React, { useState } from 'react';
import axios from 'axios';

function DnsPage() {
  const [type, setType] = useState('');
  const [hostname, setHostname] = useState('');
  const [ipaddress, setIpaddress] = useState('');
  const [domain, setDomain] = useState('');

  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/dnsrecords/create', {
        type,
        hostname,
        ipaddress,
        domain,
      });

      if (response.status === 201) {
        console.log('DNS record created successfully!');
        setMessage('DNS record created successfully!');
        setDomain('');
        setHostname('');
        setType('');
        setIpaddress('');
      } else {
        if (response.status === 401) {
          console.error('Error: You are not authorized to create Dns record!');
        } else {
          console.error('Error creating Dns record:', response.data || response.statusText);
          setMessage('Error creating02 Dns record: ' + (response.data || response.statusText));
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('You are not authorized to create Dns record');
      } else {
        console.error('Error creating Dns record:', error);
        setMessage('An error occurred while creating the Dns record. Please try again later.');
      }
    }
  };

  return (
    <div className="shift-right">
      <h1>Create DNS Record</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="vmName">Type:</label>
        <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} />
        <label htmlFor="vmName">Hostname:</label>
        <input type="text" id="hostname" value={hostname} onChange={(e) => setHostname(e.target.value)} />
        <label htmlFor="vmName">Ipaddress:</label>
        <input type="text" id="ipaddress" value={ipaddress} onChange={(e) => setIpaddress(e.target.value)} />
        <label htmlFor="vmName">Domain:</label>
        <input type="text" id="domain" value={domain} onChange={(e) => setDomain(e.target.value)} />

        <button type="submit">Create DNS Record</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DnsPage;