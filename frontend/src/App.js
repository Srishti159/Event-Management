import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import EventManagementPage from "./pages/EventManagementPage";
import AttendeeManagementPage from "./pages/AttendeeManagementPage";
import TaskTrackerPage from "./pages/TaskTrackerPage";
import Footer from './components/Footer';
const App = () => {
  return (
    <Router>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Navbar />
        <Routes>
          <Route path="/events" element={<EventManagementPage />} />
          <Route path="/attendees" element={<AttendeeManagementPage />} />
          <Route path="/tasks" element={<TaskTrackerPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
