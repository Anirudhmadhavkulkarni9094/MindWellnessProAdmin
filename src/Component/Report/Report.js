import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoBack from '../GoBack';
import Toast from '../Toast';


function Modal({ response, closeModal }) {
    const formattedText  = (responsetext) => responsetext.split('**').map((part, index) => {
        if (index % 2 === 0) {
          return <span key={index}>{part.replace(/\*/g, '')}</span>;
        } else {
          return <div><br/><strong key={index}>{part.replace(/\*/g, '')}</strong><br/></div>;
        }
        
      });
      
    
    return (
      
      <div className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center  p-20 overflow-y-scroll'>
        <div className='bg-white p-6 rounded-lg m-10 w-screen max-h-96 overflow-y-scroll'>
        <h1 className='font-bold'>{response.name.toUpperCase()}</h1>
        <hr></hr>
          <h1>{formattedText(response.suggestions)}</h1>
          <button
            className='px-3 py-1 bg-red-800 text-white hover:bg-red-600 rounded-md mt-4'
            onClick={closeModal}
          >
            Close
          </button>
        </div>
        {console.log(response)}
      </div>
    );
  }

function Report() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
 const [toast , setToast] = useState(false);
    const [message , setMessage] = useState("");
  useEffect(() => {
    axios.get('http://localhost:3001/getReport')
      .then(res => {
        setReports(res.data.data);
      })
      .catch(err => {
        console.log('Error in fetching data');
      });
  }, []);

  const handleModalOpen = (report) => {
    setSelectedReport(report);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedReport(null);
    setModalOpen(false);
  };

  
  useEffect(() => {
    setTimeout(() => {
      setToast(false);
    }, 3000);
  }, [toast]);
  
   let ReportDeletionButton = (uniqueId )  =>{
         axios.delete(`http://localhost:3001/deleteReport/${uniqueId}`).then(console.log("deleted"));
         const confirmDelete = window.confirm(`Are you sure you want to delete?`);
         if(confirmDelete) {
             setReports(reports)
             setMessage("Report deleted successfully");
             setToast(true)
         }   
         setReports(reports)   
    };
  

  return (
    <div className="overflow-x-auto">
      <GoBack />
      {toast && <Toast message={message}></Toast>}
      <table className="min-w-full divide-y divide-gray-200 text-center">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reports.map((report, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{report.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => handleModalOpen(report)}>View Details</button>
                <button onClick={()=>ReportDeletionButton(report.uniqueId)} className="px-4 mx-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
      Delete Report
    </button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
  
      {modalOpen && selectedReport && (
        <Modal
          response={selectedReport}
          closeModal={handleModalClose}
        />
      )}
    </div>
  );
  
}

export default Report;
