import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoBack from '../GoBack';

function AdminApproval() {
  const [admins, setAdmins] = useState([]);
  const loggedInAdminId = sessionStorage.getItem("adminID");

  useEffect(() => {
    axios.get("https://mindwellnesspro.onrender.com/getAdmin")
      .then(res => {
        setAdmins(res.data.data);
      })
      .catch(err => {
        setAdmins([]);
      });
  }, [loggedInAdminId]);

  const handleDemotion = (id) => {
    axios.put(`https://mindwellnesspro.onrender.com/demote-to-superadmin/${id}`)
      .then(res => {
        alert("User demoted successfully");
        // Update the admin list after successful demotion
        setAdmins(prevAdmins => prevAdmins.map(admin => {
          if (admin._id === id) {
            return { ...admin, superAdmin: false };
          }
          return admin;
        }));
      })
      .catch(err => {
        alert("Demotion failed");
      });
  };

  const handleApprove = (id) => {
    axios.put(`https://mindwellnesspro.onrender.com/approveLogin/${id}`)
      .then(res => {
        alert("User approved successfully");
        // Update the admin list after successful approval
        setAdmins(prevAdmins => prevAdmins.map(admin => {
          if (admin._id === id) {
            return { ...admin, status: true };
          }
          return admin;
        }));
      })
      .catch(err => {
        alert("Approval failed " + err);
      });
  };
  const handleDisApprove = (id) => {
    axios.put(`https://mindwellnesspro.onrender.com/DisapproveLogin/${id}`)
      .then(res => {
        alert("User Disapproved successfully");
        // Update the admin list after successful approval
        setAdmins(prevAdmins => prevAdmins.map(admin => {
          if (admin._id === id) {
            return { ...admin, status: false };
          }
          return admin;
        }));
      })
      .catch(err => {
        alert("Approval failed " + err);
      });
  };

  const handlePromotion = (id) => {
    axios.put(`https://mindwellnesspro.onrender.com/promote-to-superadmin/${id}`)
      .then(res => {
        alert("User promoted successfully");
        // Update the admin list after successful promotion
        setAdmins(prevAdmins => prevAdmins.map(admin => {
          if (admin._id === id) {
            return { ...admin, superAdmin: true , status : true };
          }
          return admin;
        }));
      })
      .catch(err => {
        alert("Promotion failed");
      });
  };

  const filteredAdmins = admins.filter(admin => admin._id !== loggedInAdminId);

  return (
    <div className="container mx-auto px-4 py-8">
        <GoBack/>
      <h1 className="text-2xl font-bold mb-6">Admin Approval</h1>
      <div className="grid gap-4">
        {filteredAdmins.map((admin, index) => (
          <div key={index} className="border border-gray-200 rounded-md p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-1/3">
                <h2 className="text-lg font-semibold">{admin.name}</h2>
                <p className="text-sm text-gray-600">{admin.email}</p>
              </div>
              <div className='flex gap-5'>
              <div>
                {
                  admin.status === false ? (
                    <h1 className='font-bold cursor-pointer text-red-500 border-2 border-red-500 rounded-lg p-2' onClick={() => handleApprove(admin._id)}>Unapproved</h1>
                  ) : (
                    <h1 className='font-bold cursor-pointer text-green-500 border-2 border-green-500 rounded-lg p-2' onClick={() => handleDisApprove(admin._id)}>Approved</h1>
                    )
                  }
              </div>
              <div>
                {admin.superAdmin === false ? (
                  <h1 className='font-bold cursor-pointer text-red-500 border-2 border-red-500 rounded-lg p-2' onClick={() => handlePromotion(admin._id)}>Admin</h1>
                  ) : (
                    <h1 className='font-bold cursor-pointer text-green-500 border-2 border-green-500 rounded-lg p-2' onClick={() => handleDemotion(admin._id)}>Head Admin</h1>
                    )}
              </div>
              </div>
              {/* <div className="flex gap-4">
                {admin.superAdmin === false && (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                    onClick={() => handlePromotion(admin._id)}
                  >
                    Promote
                  </button>
                )}
                {admin.superAdmin === true && (
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                    onClick={() => handleDemotion(admin._id)}
                  >
                    Demote
                  </button>
                )}
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminApproval;
