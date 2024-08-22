import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store/store.js";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
let persistor = persistStore(store);

import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Layout from "./Layout.jsx";
import UserPanel from "./components/UserPanel.jsx";
import ProtectedLayout from "./auth/ProtectedLayout.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import PostJob from "./components/PostJob.jsx";
import ViewPostedJobs from "./components/ViewPostedJobs.jsx";
import EditJob from "./components/EditJob.jsx";
import ViewJobs from "./components/ViewJobs.jsx";
import YourApplications from "./components/YourApplications.jsx";
import ViewApplications from "./components/ViewApplications.jsx";

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
          <Route path="" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/panel/admin" element={<AdminPanel />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="panel">
            <Route path="admin">
              <Route path="post-job" element={<PostJob />} />
              <Route
                path="view-jobs"
                element={<ViewPostedJobs />}
              />
              <Route
                path="view-jobs/edit/:id"
                element={<EditJob />}
              />
              <Route
                path="view-jobs/view-applications/:jobId"
                element={<ViewApplications />}
              />
            </Route>
            <Route path="user">
              <Route path="view-jobs"  element={<ViewJobs />}/>
              <Route path="applied-jobs"  element={<YourApplications />}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>{router}</PersistGate>
  </Provider>
);
