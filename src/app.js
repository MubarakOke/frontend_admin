import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./Pages/login";
import Admin from "./Pages/Dashboard/index";
import Monitor from "./Pages/Monitor/monitor";
import ErranderMonitor from "./Pages/Monitor/erranderMonitor";
import CustomerMonitor from "./Pages/Monitor/customerMonitor";
import ErranderDetails from "./Pages/Monitor/erranderDetails";
import CustomerDetails from "./Pages/Monitor/customerDetails";
import AdminHistory from "./Pages/History/history";
import Today from "./Pages/History/today";
import ThisWeek from "./Pages/History/thisWeek";
import AdminDate from "./Pages/History/date";
import Blogger from "./Pages/Blog/blogger";
import CreateBlogger from "./Pages/Blog/create_blogger";

import LoadingOverlay from 'react-loading-overlay'
import SyncLoader from 'react-spinners/SyncLoader'
import { Toaster } from "react-hot-toast";
import { useSelector} from "react-redux";
import { RequireAuth } from "./Utils/requireAuth";


const App = () => {
  const spinnerState= useSelector((state)=>state.spinner)
  return (
    <div>
      {/* ----------------Notification Begins------------- */}
      <LoadingOverlay
        active={spinnerState}
        spinner={<SyncLoader color={'#0E4E48'}/>}
        styles={{
          overlay: (base) => ({
            ...base,
            position: 'fixed'
            })
          }}
       >

      <div>
        <Toaster
          toastOptions={{
            success: {
              duration: 5000,
              position: "top-center",
              style: { background: "#0E4E48", color: "white" },
            },
            error: {
              duration: 5000,
              position: "top-center",
              style: { background: "red", color: "white" },
            },
          }}
          containerStyle={{ top: 50 }}
        />
      </div>
      {/* ----------------Notification Ends------------- */}
      {/* -----------Routes Begins--------------- */}
      <Routes>
        <Route path="/dashboard" element={<RequireAuth loginPath="/"><Admin /></RequireAuth>} />
        <Route path="/monitor" element={<RequireAuth loginPath="/"><Monitor /></RequireAuth>}>
          <Route index element={<Navigate to="/monitor/errander" />} />
          <Route path="/monitor/errander" element={<RequireAuth loginPath="/"><ErranderMonitor /></RequireAuth>} />
          <Route path="/monitor/customer" element={<RequireAuth loginPath="/"><CustomerMonitor /></RequireAuth>} />
        </Route>
        <Route path="/monitor/errander/:id" element={<RequireAuth loginPath="/"><ErranderDetails /></RequireAuth>} />
        <Route path="/monitor/customer/:id" element={<RequireAuth loginPath="/"><CustomerDetails /></RequireAuth>} />
        <Route path="/history" element={<RequireAuth loginPath="/"><AdminHistory /></RequireAuth>}>
          <Route index element={<Navigate to="/history/today" />} />
          <Route path="/history/today" element={<RequireAuth loginPath="/"><Today /></RequireAuth>} />
          <Route path="/history/thisweek" element={<RequireAuth loginPath="/"><ThisWeek /></RequireAuth>} />
          <Route path="/history/date" element={<RequireAuth loginPath="/"><AdminDate /></RequireAuth>} />
        </Route> 
        <Route path="/manage-blogger" element={<Blogger/>} />
        <Route path="/create-blogger" element={<CreateBlogger/>} />   
        <Route path="/" element={<Login />} />
      </Routes>
      {/* -----------Routes Ends--------------- */}
      </LoadingOverlay>
    </div>
  );
};

export default App;
