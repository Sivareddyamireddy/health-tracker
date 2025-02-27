import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container">
        <Link to="/" className="navbar-brand">ExcerTracker</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Exercises</Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link">Create Exercise Log</Link>
            </li>
            <li className="nav-item">
              <Link to="/user" className="nav-link">Create User</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
