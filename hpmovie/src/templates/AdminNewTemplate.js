import React from "react";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "./../pages/admin-news/Sidebar";

const AdminLayout = props => {
  return (
    <div>
    Sidebar
      {/* Navbar Admin */}
      <Sidebar />
      {props.children}
    </div>
  );
};

export default function AdminNewTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={propsComponent => {
        if (JSON.parse(localStorage.getItem("UserAdmin"))) {
          if (
            JSON.parse(localStorage.getItem("UserAdmin")).maLoaiNguoiDung ===
              "QuanTri" ||
            JSON.parse(localStorage.getItem("UserAdmin")).chucVu === "Quang Li"
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
