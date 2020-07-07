import React, { Component } from 'react';


export default class NgayChieu extends Component {
    render() {
        const {ngayChieu} = this.props
      
       
        return (
            
            <div className="tabcontent">
    
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
  {/* Links */}
  <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link" href="##" onClick={()=>{this.props.maNgayChieu(new Date(ngayChieu.ngayChieuGioChieu).toLocaleDateString())}}>{new Date(ngayChieu.ngayChieuGioChieu).toLocaleDateString()}</a>
    </li>
  
  </ul>
</nav>
            </div>




        )
    }
}
