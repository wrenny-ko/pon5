import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <a href="/">
          <img src="/favicon.ico" className="icon nav-entry" alt="Pon5 logo"/>
        </a>
      </div>
      <div className="upload">
        <a href="/upload" className="upload">
          <img src="/upload.png" className="icon nav-entry" alt="upload"/>
        </a>
      </div>
      <div className="account nav-entry">
        <a href="/login" className="account">
          <img src="/avatars/default.png" className="icon avatar" alt="avatar"/>
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
