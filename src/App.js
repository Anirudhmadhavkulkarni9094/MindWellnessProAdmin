import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Component/Login';
import AdminPanel from './Component/AdminPanel';
import Response from './Component/Response/Response';
import Report from './Component/Report/Report';
import Forum from './Component/Forums/Forum';
import Complaints from './Component/Complaints/Complaints';

function App() {
  return (
    <>
    <BrowserRouter>
    <h1 className='text-center font-bold bg-white pt-5 '>ADMIN PANEL</h1>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/response" element={<Response/>} />
            <Route path="/admin/Reports" element={<Report />} />
            <Route path="/admin/Forums" element={<Forum />} />
            <Route path="/admin/Complaints" element={<Complaints />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
