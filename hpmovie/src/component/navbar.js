import React, { Component } from "react";

import { Link, NavLink } from "react-router-dom"; 

export default class NavBar extends Component {
  
  
  render() {
    let tenAD =JSON.parse(localStorage.getItem("UserAdmin"));
    console.log(tenAD);
    let dangnhap ="đăng nhập";
    let LI;

    console.log(this.props)
    if(tenAD){
      dangnhap=tenAD.taiKhoan
      LI=<li onClick={()=>{localStorage.clear();}}><Link to="/">Đăng Xuất</Link></li>;

    }
    return (
      
      <header id="header" className="header">
  <div className="header__content">
    <div className="header__logo">
    <Link to={`/`}>
      <p>HPMOVIE</p>
      </Link>
    </div>
    <ul>
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li><NavLink   to="/signin">{dangnhap}</NavLink></li>
      {LI}
      
    </ul>
  </div>
</header>

     
    );
  }
}
