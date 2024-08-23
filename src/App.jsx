import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import Layout from './Layout';
import Hero from './components/Hero'
import Register from './components/Register';
import Login from './components/Login';
import ProtectedLayout from './auth/ProtectedLayout';

import PostJob from './components/admin-panel/PostJob';
import EditJob from './components/admin-panel/EditJob';
import ViewPostedJobs from './components/admin-panel/ViewPostedJobs';
import ViewApplications from './components/admin-panel/ViewApplications';

import ViewJobs from './components/user-panel/ViewJobs';
import YourApplications from './components/user-panel/YourApplications';


function App() {
  const router = (
    <>
      <ToastContainer
        autoClose={1500}
        pauseOnFocusLoss={false}
        limit={2}
        pauseOnHover={false}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Hero />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route path="panel">
              <Route path="admin">
                <Route path="post-job" element={<PostJob />} />
  
                <Route path="view-jobs">
                  <Route path="" element={<ViewPostedJobs />} />
                  <Route path="edit/:id" element={<EditJob />} />
                  <Route
                    path="view-applications/:jobId"
                    element={<ViewApplications />}
                  />
                </Route>
              </Route>
              <Route path="user">
                <Route path="view-jobs" element={<ViewJobs />} />
                <Route path="applied-jobs" element={<YourApplications />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
  return (
    <>
    {router}
    </>
  )
}

export default App