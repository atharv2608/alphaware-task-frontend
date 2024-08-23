import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./Layout";
import Hero from "./components/Hero";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedLayout from "./auth/ProtectedLayout";

import PostJob from "./components/admin-panel/PostJob";
import EditJob from "./components/admin-panel/EditJob";
import ViewPostedJobs from "./components/admin-panel/ViewPostedJobs";
import ViewApplications from "./components/admin-panel/ViewApplications";

import ViewJobs from "./components/user-panel/ViewJobs";
import YourApplications from "./components/user-panel/YourApplications";
import { useSelector } from "react-redux";

function App() {
  const loginStatus = useSelector((state) => state.auth.status);
  const role = useSelector((state) => state.auth?.role);
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
          <Route path="/" element={<Layout loginStatus={loginStatus} />}>
            <Route path="" element={<Hero />} />
            <Route
              path="/register"
              element={<Register loginStatus={loginStatus} />}
            />
            <Route
              path="/login"
              element={<Login loginStatus={loginStatus} />}
            />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route path="panel">
              <Route path="admin">
                <Route path="post-job" element={<PostJob />} role={role} />

                <Route path="view-jobs">
                  <Route path="" element={<ViewPostedJobs role={role} />} />
                  <Route path="edit/:id" element={<EditJob role={role} />} />
                  <Route
                    path="view-applications/:jobId"
                    element={<ViewApplications role={role} />}
                  />
                </Route>
              </Route>
              <Route path="user">
                <Route path="view-jobs" element={<ViewJobs  role={role} />} />
                <Route path="applied-jobs" element={<YourApplications  role={role} />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
  return <>{router}</>;
}

export default App;
