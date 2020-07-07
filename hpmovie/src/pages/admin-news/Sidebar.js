import React from "react";
import { Link,NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="news__sidebar">
      <div
      className="sidebar"
      data-color="purple"
      data-background-color="white"
      data-image="../assets/img/sidebar-1.jpg"
    >
      <div className="logo">
        <a
          href="http://www.creative-tim.com"
          className="simple-text logo-normal"
        >
          Creative Tim
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          <li className="nav-item">
            <NavLink exact activeClassName="active" className="nav-link" to="/admin-news">
              <i className="material-icons">dashboard</i>
              <p>News</p>
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link" to="/admin-user">
              <i className="material-icons">person</i>
              <p>User</p>
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link" to="/admin-ne">
              <i className="material-icons">content_paste</i>
              <p>Table List</p>
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link" to="/admin-n">
              <i className="material-icons">library_books</i>
              <p>Typography</p>
            </NavLink>
          </li>
         
         
         
         
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
