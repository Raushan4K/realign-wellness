import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./views/Layout";
import { URLS } from "./urls";
import UserLayout from "./views/UserLayout";
import AdminDashboard from "./views/AdminDashboard";
import Members from "./views/Members";
import Trainers from "./views/Trainers";
import UserDashboard from "./views/UserDashboard";
import TrainerDashboard from "./views/TrainerDashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to={URLS.HOME} replace />} />
            <Route path={URLS.HOME} element={<Home />} />
          </Route>
          <Route path="/" element={<UserLayout />}>
            <Route path={URLS.ADMIN} element={<AdminDashboard />} />
            <Route path={URLS.MEMBERS} element={<Members />} />
            <Route path={URLS.TRAINERS} element={<Trainers />} />
            <Route path={URLS.USERS} element={<UserDashboard/>} />
            <Route path={URLS.TRAINERSDASHBOARD} element={<TrainerDashboard/>} />

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
