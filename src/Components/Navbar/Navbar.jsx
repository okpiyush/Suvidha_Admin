import React, { useContext, useState } from 'react';
import './Sidebar.css';
import styled from 'styled-components';
import { LoginContext } from '../../Context/LoginContext';

const Center = styled.div`
  font-size: 25px;
  font-weight: 500;
`;

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #fff;
`;

const Navbar = (children) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const { loginData, handleLogout } = useContext(LoginContext);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <NavbarContainer>
      <div className={`side-navbar ${sidebarActive ? 'active-nav' : ''} d-flex justify-content-between flex-wrap flex-column`} id="sidebar">
      <ul className="nav flex-column text-white w-100">
          <a href="/home" className="nav-link h3 text-white my-2">
            Suvidha Admin
          </a>
          <a href="/home" className="nav-link">
                  <i className="bx bxs-dashboard"></i>
                  <span className="mx-2">Home</span>
          </a>
          {
            loginData?
            (
              <div>
                
                <a href="/users" className="nav-link">
                  <i className="bx bxs-user"></i>
                  <span className="mx-2">Users</span>
                </a>
                <a href="/products" className="nav-link">
                  <i class='bx bx-box' ></i>
                  <span className="mx-2">Products</span>
                </a>
                <a href="/orders" className="nav-link">
                  <i className="bx bxs-package"></i>
                  <span className="mx-2">Orders</span>
                </a>
                <a href="/announcements" className="nav-link">
                  <i className="bx bxs-megaphone"></i>
                  <span className="mx-2">Announcements</span>
                </a>
                <a href="/cart" className="nav-link">
                  <i className="bx bxs-cart"></i>
                  <span  className="mx-2">Active Carts</span>
                </a>
                <a href="/mails" className="nav-link">
                  <i className="bx bx-envelope"></i>
                  <span className="mx-2">Mail</span>
                </a>
                <a href="/slideshow" className="nav-link">
                  <i className="bx bx-slideshow"></i>
                  <span className="mx-2">Slideshow</span>
                </a>
                <a href="/chat" className="nav-link">
                  <i className="bx bx-chat"></i>
                  <span className="mx-2">Chat</span>
                </a>
                <a href="/cart" className="nav-link">
                  <i className="bx bxs-report"></i>
                  <span  className="mx-2">Report</span>
                </a>
                <a href="/profile" className="nav-link">
                  <i className="bx bx-user-check"></i>
                  <span className="mx-2">Profile</span>
                </a>
                <a href="/login" onClick={handleLogout} className="nav-link">
                  <i className="bx bx-log-out"></i>
                  <span className="mx-2">Log out</span>
                </a>
              </div>
            ):(
              <a href="/login" className="nav-link">
                <i className="bx bx-log-in"></i>
                <span className="mx-2">Login</span>
              </a>
            )
          }
          
          
        </ul>
        {/* <span href="#" className="nav-link h4 w-100 mb-5">
          <a href="https://www.instagram.com"><i className="bx bxl-instagram-alt text-white"></i></a>
          <a href="https://www.instagram.com"><i className="bx bxl-twitter px-2 text-white"></i></a>
          <a href="https://www.instagram.com"><i className="bx bxl-facebook text-white"></i></a>
        </span> */}
      </div>

      <div className={`p-1 my-container ${sidebarActive ? 'active-cont' : ''}`}>
        <nav className="navbar top-navbar navbar-light bg-light">
          <button className="btn border-0" id="menu-btn" onClick={toggleSidebar}>
            <i className="bx bx-menu"></i>
          </button>
          <Center>
            Suvidha Admin
          </Center>
        </nav>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
