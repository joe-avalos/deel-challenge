import React from 'react'
import {Link} from "react-router-dom";
import logo from '../static/favicon.png'

const Navbar = () => <nav className="navbar navbar-expand navbar-light">
  <div className="container-fluid">
    <Link to="/">
      <img src={logo} alt="Logo" className="navbar-brand"/>
    </Link>
    <ul className="navbar-nav mb-2">
      <li className="nav-item mx-3"><Link to="/">Users</Link></li>
      <li className="nav-item mx-3"><Link to="/contracts">Contracts</Link></li>
      <li className="nav-item mx-3"><Link to="/jobs">Unpaid Jobs</Link></li>
      <li className="nav-item mx-3"><Link to="/admin/best-profession">Best Profession</Link></li>
      <li className="nav-item mx-3"><Link to="/admin/best-clients">Best Clients</Link></li>
    </ul>
  </div>
</nav>

export default Navbar
