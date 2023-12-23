import React, { useState } from 'react';

function Login() {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const handleLogin = () => {
      if (email === 'admin@gmail.com' && password === 'admin') {
        sessionStorage.setItem('auth', true);
        window.location.href = '/admin';
        alert('Logged in successfully');
        
        // Set session timeout for 1 hour (3600000 milliseconds)
        setTimeout(() => {
          sessionStorage.removeItem('auth'); // Remove auth flag after 1 hour
          alert('Session expired. Please log in again.');
          window.location.href = '/login'; // Redirect to login after session expiry
        }, 3600); // 1 hour in milliseconds
      } else {
        alert('Invalid credentials');
      }
    };
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
     <form className="w-full sm:w-96 p-6 bg-white rounded-lg shadow-xl" onSubmit={(e) => { handleLogin(); e.preventDefault(); }}>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="name"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md shadow-sm"
           onChange={(e)=>setEmail(e.target.value)}
           />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="email"
            type="text"
            placeholder="Password"
            className="w-full px-4 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md shadow-sm"
            onChange={(e)=>setPassword(e.target.value)}
         />
        </div>
        <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type= "submit">
          Login
        </button>
        <p className="mt-4 text-sm text-red-500">
          Not a member? <a href="/Signup" className="text-blue-500">Signup</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
