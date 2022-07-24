import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png';
import '../css/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/"><img style={{ width: "130px" }} src={logo} /></NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/"><span className="nav1">Home</span> <span className="sr-only">(current)</span></NavLink>
          <NavLink className="nav-item nav-link" to="/about">About</NavLink>
          <NavLink className="nav-item nav-link login" to="/login">Login</NavLink>
          <NavLink className="nav-item nav-link" to="/signup">Registration</NavLink>
          <NavLink className="nav-item nav-link logout" to="/logout">Logout</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar