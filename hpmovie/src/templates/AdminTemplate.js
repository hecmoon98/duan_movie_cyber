import React from "react";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "./../pages/admin-news/Sidebar";
// import NewsNavbar from "./../pages/admin-news/conponent/news-navbar"


const AdminLayout = props => {
  return (
    <div>
      {/* Navbar Admin */}
      <Sidebar />
      {props.children}
    </div>
  );
};

export default function AdminTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={propsComponent => {
        if (JSON.parse(localStorage.getItem("UserAdmin"))) {
          if (
            JSON.parse(localStorage.getItem("UserAdmin")).maLoaiNguoiDung ===
            "QuanTri"
          ) {
            return (
              <AdminLayout>
                <Component {...propsComponent} />
              </AdminLayout>
            );
          } else {
            return <Redirect to="/admin" />;
          }
        } else {
          return <Redirect to="/admin" />;
        }
      }}
    />
  );
}
