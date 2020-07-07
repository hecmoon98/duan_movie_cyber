import React from "react";
import NewsNavbar from "./../conponent/news-navbar";
import NewsContent from "../conponent/NewsContent";

const AdminNews = () => {
  return (
    <div className="wrapper">
      <div className="admin__news">
        <div className="main-panel">
          <NewsNavbar />
          <NewsContent />
        
        </div>
      </div>
    </div>
  );
};

export default AdminNews;
