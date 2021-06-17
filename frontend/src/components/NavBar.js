import React from 'react'
import {Link} from "react-router-dom";

const Navbar = () => <nav>
  <div className="nav-wrapper">
    <ul className="right hide-on-small-only">
      <li><Link to="/">Users</Link></li>
      <li><Link to="/contracts">Contracts</Link></li>
      <li><Link to="/jobs">Unpaid Jobs</Link></li>
      <li><Link to="/admin/best-profession">Best Profession</Link></li>
      <li><Link to="/admin/best-clients">Best Clients</Link></li>
    </ul>
  </div>
</nav>

export default Navbar
