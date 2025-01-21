import React from "react";
import { Link } from "react-router-dom";
import "./../assets/styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="dashboard-text">Dashboard</span>
      </div>
      <div className="navbar-center">
        <ul className="navbar-list">
          <li>
            <Link to="/events" className="navbar-link">Events</Link>
          </li>
          <li>
            <Link to="/attendees" className="navbar-link">Attendees</Link>
          </li>
          <li>
            <Link to="/tasks" className="navbar-link">Tasks</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
