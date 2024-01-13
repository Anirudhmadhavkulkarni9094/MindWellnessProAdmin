import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import AdminPanel from './Component/AdminPanel';
import Response from './Component/Response/Response';
import Report from './Component/Report/Report';
import Forum from './Component/Forums/Forum';
import Complaints from './Component/Complaints/Complaints';
import QuestionHome from './Component/Questions/QuestionHome';
import AdminApproval from './Component/AdminApproval/AdminApproval';
import Testimonial from './Component/Testimonials/Testimonial';
import Suggestions from './Component/Suggestions/Suggestions';

function App() {
  const auth = sessionStorage.getItem("auth") === "true";
  return (
    <>
    <BrowserRouter>
    <h1 className='text-center font-bold bg-white p-2 '>ADMIN PANEL</h1>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} />
            {auth ? <>
            <Route path="/admin/response" element={<Response/>} />
            <Route path="/admin/Reports" element={<Report />} />
            <Route path="/admin/Forums" element={<Forum />} />
            <Route path="/admin/Complaints" element={<Complaints />} />
            <Route path = "/admin/Questions" element= {<QuestionHome/>}></Route>
            <Route path = "/admin/Admin-Approval" element = {<AdminApproval/>}></Route>
            <Route path = "/admin/Testimonial" element = {<Testimonial/>}></Route>
            <Route path = "/admin/Suggestions" element = {<Suggestions/>}></Route>
            </> : <Route path = "/admin/Admin-Approval" element = {<h1 className='font-bold text-center'>Cannot be accessed Without logging in</h1>}></Route>}
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
