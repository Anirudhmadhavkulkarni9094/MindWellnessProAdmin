import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoBack from '../GoBack';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    async function fetchComplaints() {
      try {
        const response = await axios.get('http://localhost:3001/complaint');
        if (response.status === 200) {
          setComplaints(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    }

    fetchComplaints();
  }, []);

  return (
    <div className="container mx-auto py-8">
        <GoBack></GoBack>
      <h1 className="text-3xl font-bold mb-4 mx-10">Complaints</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-10 ">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="border p-4 rounded shadow-md bg-white relative"
          >
            <h2 className="text-lg font-semibold">{complaint.name}</h2>
            <p className="text-gray-600">{complaint.email}</p>
            <p>{complaint.message}</p>
            <button className='bg-green-700 px-3 py-2 hover:bg-green-600 text-white rounded-md mt-5 absolute top-0 right-10'>Resolved </button>
          </div>

        ))}
      </div>
    </div>
  );
};

export default Complaints;
