import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "./../../redux/action";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown-now';

class TicketMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maLichChieu: "",
      danhSachVe: [],
      taiKhoanNguoiDung: "",
      soGhe: []
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(this.props.match.params.id);
    this.props.getPhongVe(id);
    this.props.setLoading();
    this.setState({
      maLichChieu: id
    });
  }

  clickActi = (maGhe, giaVe, soGhe) => {
    const objMaGhe = {
      maGhe,
      giaVe
    };

    const objsoGhe = {
      soGhe
    };

    let danhSachSoGhe = [...this.state.soGhe];

    let danhSachVe = [...this.state.danhSachVe];

    let index = danhSachVe.findIndex(item => item.maGhe === maGhe);

    let index2 = danhSachSoGhe.findIndex(item => item.soGhe === soGhe);

    if (index !== -1) {
      danhSachVe.splice(index, 1);
      this.setState({
        danhSachVe
      });
    } else {
      danhSachVe = [...this.state.danhSachVe, objMaGhe];
    }

    if (index2 !== -1) {
      console.log(index);
      danhSachSoGhe.splice(index2, 1);
      this.setState({
        soGhe: danhSachSoGhe,
      });
    } else {
      danhSachSoGhe = [...this.state.soGhe, objsoGhe];
    }


    this.setState({
      soGhe: danhSachSoGhe,
      danhSachVe 

    });
  };

  renderGhe = () => {
    if (this.props.listPhongVe.danhSachGhe) {
      const { danhSachGhe } = this.props.listPhongVe;

      return danhSachGhe.map((item, index) => {
        let classGhe = "styleGhe";
        if (item.daDat) {
          classGhe = "styleGhe active";
          if (item.loaiGhe === "Vip") {
            classGhe = "styleGhe active vip";
          }
        } else {
          classGhe = "styleGhe";

          if (item.loaiGhe === "Vip") {
            classGhe = "styleGhe vip";
          }
        }

        return (
          <div
            key={index}
            onClick={() => {
              this.clickActi(item.maGhe, item.giaVe);
            }}
            className={classGhe}
          ></div>
        );
      });
    }
  };

  renderGhe2 = () => {
    if (this.props.listPhongVe.danhSachGhe) {
      const { danhSachGhe } = this.props.listPhongVe;

      return danhSachGhe.map((item, index) => {
        let classGhe = "ghe__ngoi";
        if (item.daDat) {
          classGhe = "ghe__ngoi active";
          if (item.loaiGhe === "Vip") {
            classGhe = "ghe__ngoi active vip";
          }
        } else {
          classGhe = "ghe__ngoi";

          if (item.loaiGhe === "Vip") {
            classGhe = "ghe__ngoi vip";
          }
        }

        return (
          <div key={index} className="styleGhe">
            <label className={classGhe}>
              <input
                onClick={() => {
                  this.clickActi(item.maGhe, item.giaVe, item.tenGhe);
                }}
                type="checkbox"
                defaultChecked="checked"
              />

              <span className="checkmark">
                <div className="checkmark__detail">{item.tenGhe}</div>
              </span>
            </label>
          </div>
        );
      });
    }
  };

  handMuaVe = state => {
    let tenAD = JSON.parse(localStorage.getItem("UserAdmin"));
    console.log(state);

    if (tenAD) {
      this.setState({
        taiKhoanNguoiDung: tenAD.taiKhoan
      });
      this.props.postDatVe(state);
    }
  };
  renderlistPhim = () => {
    if (this.props.listPhongVe.thongTinPhim) {
      const { thongTinPhim } = this.props.listPhongVe;

      let tenAD = JSON.parse(localStorage.getItem("UserAdmin"));

      let linkMuaVe = "";
      let muaVe = "";
      if (tenAD) {
        linkMuaVe = "/ticket";
        muaVe = "Mua Vé";
      } else {
        linkMuaVe = "/signin";
        muaVe = "Hãy Đăng Nhập";
      }

      return (
        <section className="rightticket">
          <div className="contentright">
            <div className="logofilm">Hóa Đơn</div>
            <div className="filmname">
              <div className="namefilm">{thongTinPhim.tenPhim}</div>
              <div className="address">{thongTinPhim.tenCumRap}</div>
              <div className="address">{thongTinPhim.diaChi}</div>
              <div className="hour">{thongTinPhim.ngayChieu}</div>
              <div className="hour">{thongTinPhim.gioChieu}</div>
            </div>
            <div className="chair">
              <div className="row">
                <div className="info col-sm-7">
                  <span>Ghế</span>
                </div>
                <div className="totalchair col-sm-5">
                  {this.state.soGhe.map((item, index) => {
                    return <span style={{color: "#fb4226"}} key={index}>{item.soGhe}/</span>;
                  })}
                </div>
              </div>
            </div>
            <div className="sum">
              <div className="row">
                <div className="namemoney col-sm-7">
                  <span>Tổng tiền</span>
                </div>
                <div className="money col-sm-5">
                <span >{this.state.danhSachVe.reduce((tong,item)=>{
                    return  tong +=item.giaVe
                  },0)}đ</span>
                </div>
              </div>
            </div>
          </div>
          <Link
            to={linkMuaVe}
            onClick={() => {
              this.handMuaVe(this.state);
            }}
          >
            <div className="buyticket">{muaVe}</div>
          </Link>
        </section>
      );
    }
  };


 

  render() {
    let { loading } = this.props;
    console.log(this.state);

    if (loading) {
      return (
        <div className="loading">
          <div className="loader" />
        </div>
      );
    }

    // const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    // return <Completionist />;

    window.location.reload()

 
  } else {
    // Render a countdown
    return <span style={{
      color: "#E9204F",
      fontSize:"29px"
      

      }}  >{minutes}:{seconds}</span>;
  }
};

    return (
      <div className="ticKet">
        <section className="headerticket">
          <div className="stepcheckout">
          
            <ul>
              <li className="active">
                <span className="stepnumber">01</span>CHỌN GHẾ &amp; THANH TOÁN
              </li>
              <li>
                <span className="stepnumber">02</span>KẾT QUẢ ĐẶT VÉ
              </li>
              <li>
                <span className="stepnumber"></span>
                <Countdown
    date={Date.now() + 300000}
    renderer={renderer}
  />

              </li>
            </ul>
          </div>
        </section>
        <section className="ticket">
          <div className="screen">
            <img
              className="namescreen"
              src="https://tix.vn/app/assets/img/icons/screen.png"
              alt="#123"
            />
          </div>
          <div className="tableGhe">
            {/* {this.renderGhe()} */}
            {this.renderGhe2()}
          </div>
          <div className="noteticket">
            <div className="typenote">
              <span className="type">
                <span className="colorseat colornormal" />
                <span className="name">Ghế trống</span>
              </span>
              <span className="type">
                <span className="colorseat colorchoose" />
                <span className="name">Ghế đang chọn</span>
              </span>
              <span className="type">
                <span className="colorseat colorVip" />
                <span className="name">Ghế vip</span>
              </span>
              <span className="type">
                <span className="colorseat colorchosen" />
                <span className="name">Ghế đã chọn</span>
              </span>
            </div>
          </div>
        </section>
        {this.renderlistPhim()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listPhongVe: state.movieReducer.listPhongVe,
    loading: state.movieReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPhongVe: id => {
      dispatch(action.actGetPhongVe(id));
    },

    setLoading: () => {
      dispatch(action.actLoading());
    },

    postDatVe: user => {
      dispatch(action.actDatVe(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketMovie);
