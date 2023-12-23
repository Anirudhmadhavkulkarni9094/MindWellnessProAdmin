import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingImage from '../../Assets/loading.gif'; // Import the loading image
import GoBack from '../GoBack';
import Toast from '../Toast';

function Modal({ response, closeModal }) {
  return (
    
    <div className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center  p-20 overflow-y-scroll'>
      <div className='bg-white p-6 rounded-lg m-10 w-screen max-h-96 overflow-y-scroll'>
      <h1 className='font-bold'>{response.name.toUpperCase()}</h1>
      <hr></hr>
        {response.responses.length> 0 ? response.responses.map(res=>{
            return <div className='border-b border-gray-300 pb-2'>
            <p className='text-gray-600'>Response : {res.response}</p>
            <p className='text-gray-600'>Description : {res.text}</p>
          </div>
        }): <h1 className='text-center font-bold'>No response provided</h1>}
        <button
          className='px-3 py-1 bg-red-800 text-white hover:bg-red-600 rounded-md mt-4'
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function Response() {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState({});

  useEffect(() => {
    axios.get("https://mindwellnesspro.onrender.com/UserResponse")
      .then(res => {
        setResponse(res.data.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(err => {
        setError(err.message);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  const handleDelete = (id) => {
    // Find the response to delete
    const responseToDelete = response.find((res) => res._id === id);
  
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm(`Are you sure you want to delete '${responseToDelete.name}'?`);
    
    if (confirmDelete) {
      const updatedResponse = response.filter((res) => res._id !== id);
      setMessage('Response Deleted successfully');
      setResponse(updatedResponse);
      setAlert(true);
    }
  };

  const openModal = (res) => {
    setSelectedResponse(res);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, [alert]);

  return (
    <div className='p-10'>
      <GoBack />
      <h1 className='font-bold text-gray-400 text-sm'>{response.length} response(s)</h1>
      {alert && <Toast message={message} />}
      <div>
        {loading ? (
          <img src={LoadingImage} alt='Loading...' className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28'  />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          response.map((res, index) => (
            <div key={index} className='flex items-center justify-between px-10 py-4 border-b border-gray-300'>
              <h1 className='text-lg font-semibold'>{res.name}</h1>
              <p className='text-sm text-gray-600'>{res.email}</p>
              <div className='flex gap-5'>
                <button
                  className='px-3 py-1 rounded-md'
                  onClick={() => openModal(res)}
                >
                  <img src={require("../../Assets/view.png")} className='w-6' alt='view'></img>
                </button>
                <button
                  className='px-3 py-1 rounded-md'
                >
                  <img src={require("../../Assets/download.png")} className='w-6' alt='download'></img>
                </button>
                <button
                  className='px-3 py-1 rounded-md'
                  onClick={() => handleDelete(res._id)}
                >
                  <img src={require("../../Assets/delete.png")} className='w-6' alt='delete'></img>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {modalOpen && <Modal response={selectedResponse} closeModal={closeModal} />}
    </div>
  );
}

export default Response;
