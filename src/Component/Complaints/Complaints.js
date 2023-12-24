import React, { useState, useEffect } from "react";
import axios from "axios";
import GoBack from "../GoBack";

const Complaints = () => {
  const auth = sessionStorage.getItem('auth');
  const [complaints, setComplaints] = useState([]);
  const [status, setStatus] = useState("Unresolved");

  useEffect(() => {
    fetchComplaints();
  });

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/complaint/${status}`
      );
      setComplaints(response.data.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3001/complaint/${id}/status`, {
        status: newStatus,
      });
      fetchComplaints(); // Refresh complaints after updating status
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <GoBack />
      {auth ?
        <div>
      <div className="flex justify-between mx-4 md:mx-10 gap-1">
        <h1 className="text-3xl font-bold mb-4">Complaints</h1>
        <select
          onChange={(e) => setStatus(e.target.value)}
          className={`${
            status === "Resolved"
              ? "bg-green-600"
              : status === "Unresolved"
              ? "bg-red-600"
              : "bg-yellow-400"
            } text-white font-bold px-3 py-2 rounded-md`}
            >
          <option value={"Unresolved"}>Unresolved</option>
          <option value={"In progress"}>In progress</option>
          <option value={"Resolved"}>Resolved</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4 md:m-10">
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div
            key={complaint._id}
            className="border p-4 rounded shadow-md bg-white relative flex flex-col justify-between gap-5"
            >
              <div>
                <h2 className="text-lg font-semibold">{complaint.name}</h2>
                <p className="text-gray-600">{complaint.email}</p>
              </div>
              <p>{complaint.message}</p>
              <button
                className={`${
                  complaint.status === "Resolved"
                  ? "bg-green-600"
                  : complaint.status === "Unresolved"
                  ? "bg-red-600"
                  : "bg-yellow-400"
                } text-white font-bold px-3 py-2 rounded-md absolute top-0 right-0`}
              >
                {complaint.status}{" "}
              </button>
              <button
                className="bg-black text-white w-fit px-3 py-2 rounded-md"
                onClick={() => {
                  const newStatus =
                  complaint.status === "Unresolved"
                  ? "In progress"
                  : complaint.status === "In progress"
                  ? "Resolved"
                  : "Unresolved";
                  updateStatus(complaint._id, newStatus);
                }}
                >
                {complaint.status === "Unresolved"
                  ? "In progress"
                  : complaint.status === "In progress"
                  ? "Resolve"
                  : "Unresolve"}
              </button>
            </div>
          ))
        ) : (
          <h1 className="font-bold text-center col-span-full">
            No issues in {status}
          </h1>
        )}
        </div>
      </div>  : <h1>Cannot be accessed wihtout logging in</h1>}
    </div>
  );
};

export default Complaints;
