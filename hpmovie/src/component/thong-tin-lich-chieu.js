import React, { Component } from "react";
import { Link } from "react-router-dom";

class ThongTinLichChieu extends Component {
  constructor() {
    super();
    this.state = {
      maNgayChieu: "",
      activeNgayChieu:""
    };
  }

  handlNgayChieuActive =(activeNgayChieu)=>{
        
        
    this.setState({
      activeNgayChieu:activeNgayChieu
      
    })
  }

  renderLichChieu = key => {
    if (this.props.listLichChieu[0]) {
 
      const mang = this.props.listLichChieu[0].lstCumRap.filter(item => {
        return item.tenCumRap == key;
      });

      let ngayChieu;

      let lichChieu;

      if (mang[0]) {
    

        var helper = [];

        ngayChieu = mang[0].danhSachPhim[0].lstLichChieuTheoPhim.reduce(
          (r, o) => {
            var key =
              o.maRap +
              "-" +
              o.tenRap +
              "-" +
              new Date(o.ngayChieuGioChieu).toLocaleDateString();

            if (!helper[key]) {
              helper[key] = Object.assign({}, o); 
              r.push(helper[key]);
            }

            return r;
          },
          []
        );

        lichChieu = mang[0].danhSachPhim[0].lstLichChieuTheoPhim.filter(
          item => {
            return (
              new Date(item.ngayChieuGioChieu).toLocaleDateString() ==
              this.state.maNgayChieu
            );
          }
        );

      
      }

      return mang.map((item, index) => {
        let gioRap="Bạn Hãy Nhập Ngày Xem Phim!"
        if(lichChieu.length>0){
          gioRap=""
        }else{
          gioRap="Mời Bạn Chọn Ngày Xem Phim Đẻ Xem Giờ Chiếu!"
        }
        return (
          <div key={index}>
            <div className="date">
              {ngayChieu.map((item, index) => {
                let classNgayChieu = "";
                  if (index === this.state.activeNgayChieu) {
                    classNgayChieu = "nav-item active";
                  } else {
                    classNgayChieu = "nav-item";
                  }

                return (
                  <div
                    key={index}
                    className="tabcontent"
                    onClick={() => {
                      this.handlMaNgayChieu(
                        new Date(item.ngayChieuGioChieu).toLocaleDateString()
                      );
                    }}
                  >
                    <nav onClick={()=>{this.handlNgayChieuActive(index)}} className="navbar navbar-expand-sm bg-dark navbar-dark">
                      {/* Links */}
                      <ul className="navbar-nav">
                        <li className={classNgayChieu}>
                          <a className="nav-link" href="##">
                            {new Date(
                              item.ngayChieuGioChieu
                            ).toLocaleDateString()}
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                );
              })}
            </div>

            <div className="tabcontent">
              <div>
                <h3>{item.tenCumRap}</h3>
                <p>{item.danhSachPhim[0].tenPhim}</p>
                <p>Rạp 3</p>

                <p>2D Digital</p>
              </div>

              {gioRap}
              
              {lichChieu.map((item, index) => {
                
                return (
                  <Link key={index} to={`/ticket-movie/${item.maLichChieu}`} className="date_time">
                    {new Date(item.ngayChieuGioChieu).toLocaleTimeString()}
                  </Link>
                );
              })}

              <div className="clearrr"></div>
            </div>
          </div>
        );
      });
    }
  };

  handlMaNgayChieu = maNgayChieu => {
    this.setState({
      maNgayChieu: maNgayChieu
    });
  };

  render() {
    return (
      <div className="col-sm-6 col6_lichchieu">


        {this.renderLichChieu(this.props.tenRap)}
      </div>
    );
  }
}

export default ThongTinLichChieu;
