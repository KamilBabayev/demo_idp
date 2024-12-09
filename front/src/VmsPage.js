import React, { useState } from 'react';
import axios from 'axios';

function VmsPage() {
  const [vmName, setVmName] = useState('');
  const [vmDesc, setVmDesc] = useState('');
  const [cpuCount, setCpuCount] = useState('');
  const [memCount, setMemoryCount] = useState('');
  const [diskSpace, setDiskSpace] = useState('');
  const [datacenter, setDatacenter] = useState('');
  const [tribe, setTribe] = useState('');
  const [environment, setEnvironment] = useState('');

  const [message, setMessage] = useState('');

  const handleIncrement = () => {
    setCpuCount(cpuCount + 2);
  };

  const handleDecrement = () => {
    if (cpuCount >= 2) {
      setCpuCount(cpuCount - 2);
    }
  };

  const handleIncrMem = () => {
    setMemoryCount(memCount + 2);
  };

  const handleDecrMem = () => {
    if (memCount >= 2) {
      setMemoryCount(memCount - 2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/vm/create', {
        name: vmName,
        description: vmDesc,
        cpuCount,
        memory: memCount,
        diskSpace,
        datacenter,
        tribe,
        environment,
      });

      if (response.status === 201) {
        console.log('VM created successfully!');
        setMessage('VM created successfully!');
        setVmName('');
        setVmDesc('');
        setCpuCount(0);
        setMemoryCount('0');
        setDiskSpace('');
        setDatacenter('');
        setTribe('');
        setEnvironment('');
      } else {
        if (response.status === 401) {
          console.error('Error: You are not authorized to create VM in prod env!');
        } else {
          console.error('Error creating VM:', response.data || response.statusText);
          setMessage('Error creating02 VM: ' + (response.data || response.statusText));
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('You are not authorized to create VM in prod env!');
      } else {
        console.error('Error creating VM:', error);
        setMessage('An error occurred while creating the VM. Please try again later.');
      }
    }
  };

  return (
    <div className="shift-right">
      <h1>Create VM</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="vmName">Name:</label>
        <input type="text" id="vmName" value={vmName} onChange={(e) => setVmName(e.target.value)} />
      
        <label htmlFor="vmDesc">Description:</label>
        <input type="text" id="vmDesc" value={vmDesc} onChange={(e) => setVmDesc(e.target.value)} />

        <label htmlFor="cpuCount">CPU Count:</label>
        <div className="cpu-count-input">
          <input type="number" id="cpuCount" value={cpuCount} onChange={(e) => setCpuCount(parseInt(e.target.value))} />
        </div>

        <label htmlFor="memoryCount">Memory Size:</label>
        <div className="memory-count-input">
          <input type="number" id="memoryCount" value={memCount} onChange={(e) => setMemoryCount(parseInt(e.target.value))} />
        </div>

        <button type="submit">Create VM</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VmsPage;