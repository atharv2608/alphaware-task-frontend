
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

import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Layout from "./Layout.jsx";
import ProtectedLayout from "./auth/ProtectedLayout.jsx";
import PostJob from "./components/admin-panel/PostJob.jsx";
import ViewPostedJobs from "./components/admin-panel/ViewPostedJobs.jsx";
import ViewApplications from "./components/admin-panel/ViewApplications.jsx";
import EditJob from "./components/admin-panel/EditJob.jsx";
import ViewJobs from "./components/user-panel/ViewJobs.jsx";
import YourApplications from "./components/user-panel/YourApplications.jsx";

let persistor = persistStore(store);
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
