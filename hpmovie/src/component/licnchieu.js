import React, { Component } from 'react'
import { Link, NavLink } from "react-router-dom"; 

export default class LicnChieu extends Component {
  

    render() {
        const {lichChieu} = this.props
        const {mang2} = this.props


        console.log(mang2)

       
       
        return (
            <div className="tabcontent">
            <div>
                                <h3>{lichChieu.thongTinRap.tenCumRap}</h3>
                                <p>{lichChieu.thongTinRap.tenRap}</p>
                           

                                <p>2D Digital</p>
                                </div>
                                
                                { mang2.map((item,index)=>{
                                 return <Link key={index} to={`/ticket-movie/${item.maLichChieu}`} className="date_time" >{new Date(item.ngayChieuGioChieu).toLocaleTimeString()}</Link>
                                })}
                                
                                <div className="clearrr"></div>
                               
            </div>
        )
    }
}
