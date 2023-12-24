import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useState} from 'react'
import Login from './Component/Login';
import AdminPanel from './Component/AdminPanel';
import Response from './Component/Response/Response';
import Report from './Component/Report/Report';
import Forum from './Component/Forums/Forum';
import Complaints from './Component/Complaints/Complaints';
import QuestionHome from './Component/Questions/QuestionHome';

function App() {
  const [auth , setAuth ] = useState(false);

  let authorization = (authorize) =>{
      setAuth(authorize)
  }
  return (
    <>
    <BrowserRouter>
    <h1 className='text-center font-bold bg-white p-2 '>ADMIN PANEL</h1>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/response" element={<Response/>} />
            <Route path="/admin/Reports" element={<Report />} />
            <Route path="/admin/Forums" element={<Forum />} />
            <Route path="/admin/Complaints" element={<Complaints />} />
            <Route path = "/admin/Questions" element= {<QuestionHome/>}></Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
