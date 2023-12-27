import {React , useState , useEffect }from 'react';
import { Link } from 'react-router-dom';

function AdminPanel() {
  const auth = sessionStorage.getItem('auth') === "true";
  const [user, setUser] = useState("");
  const [superAdmin , setSuperAdmin] = useState(false);
 
  useEffect(()=>{
    setUser(sessionStorage.getItem("user"))
    setSuperAdmin(sessionStorage.getItem("superAdmin") === "true")
    
    console.log(superAdmin)
  } , [superAdmin , user])
  const actions = [
    {
      title: 'Response',
      code: 'response',
    },
    {
      title: 'Reports',
      code: 'reports',
    },
    {
        title: 'Forums',
        code: 'Forums',
      },
      {
        title: 'Complaints',
        code: 'Complaints',
      },
      {
        title: 'Questions',
        code: 'Questions',
      }
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 absolute w-full -z-10 top-0">
      {auth ? (
        <div className="w-full max-w-3xl bg-white rounded-md shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel - {user.toUpperCase().slice(0,1) + user.toLowerCase().slice(1)}</h1>
          <div className="grid gap-4">
            {actions.map((action, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4 flex justify-between items-center transition duration-300 ease-in-out hover:bg-gray-50 hover:scale-105"
              >
                <div>{action.title}</div>
                <div>
                  <Link
                    className="text-white bg-blue-500 rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out"
                    to={`/admin/${action.code}`}
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
            {
              superAdmin && <div
            
              className="border border-gray-200 rounded-md p-4 flex justify-between items-center transition duration-300 ease-in-out hover:bg-gray-50 hover:scale-105"
            >
              <div>{"Admin apporval"}</div>
              <div>
                <Link
                  className="text-white bg-blue-500 rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out"
                  to={`/admin/Admin-Approval`}
                >
                  Manage
                </Link>
              </div>
            </div>
            }
          </div>
        </div>
      ) : (
        <h1 className="text-2xl">Admin panel cannot be accessed</h1>
      )}
    </div>
  );
}

export default AdminPanel;
