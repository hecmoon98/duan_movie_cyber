import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as action from "../../redux/action";
import { connect } from "react-redux";
import ModalVideo from "react-modal-video";
import LichChieu from "./../../component/licnchieu";
import NgayChieu from "./../../component/ngaychieu";
import { compose } from "redux";

import { NavLink } from "react-router-dom";

class DetailMovie extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      youtube: "",
      rap: "",
      maLichChieu: "",

      activeRap: {
        BHDStar: false,
        CineStar: false,
        activeRapCGV: false,
        activeRapGLX: false,
        activeRapLT: false,
        activeRapMGS: false
      }
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal(link) {
    let url = link;

    let ytbURL = url.slice(0, 32);

    if (url.slice(0, 32) == "https://www.youtube.com/watch?v=") {
      ytbURL = url.replace("https://www.youtube.com/watch?v=", "");
    } else {
      ytbURL = url.replace("https://www.youtube.com/embed/", "");
    }
    this.setState({
      isOpen: true,
      youtube: ytbURL
    });
  }

  componentDidMount() {
    console.log(this.props)
    const id = this.props.match.params.id;
    this.props.getDetailMovie(id);
    this.props.setLoading()
  }

  renderRap = () => {
    if (this.props.movie.lichChieu) {
      return this.props.movie.lichChieu.map((item, index) => {
        return <LichChieu key={index} lichChieu={item} />;
      });
    }
  };

  renderNgayChieu = keyWord => {


    if (this.props.movie.lichChieu) {
      const mang = this.props.movie.lichChieu.filter(item => {
        return item.thongTinRap.maHeThongRap == keyWord;
      });

      var helper = [];

      var ngayChieu = mang.reduce((r, o) => {
        var key =
          o.thongTinRap.tenRap +
          "-" +
          o.thongTinRap.maCumRap +
          "-" +
          o.tenPhim +
          "-" +
          new Date(o.ngayChieuGioChieu).toLocaleDateString();

        if (!helper[key]) {
          helper[key] = Object.assign({}, o); // create a copy of o
          r.push(helper[key]);
        }

        return r;
      }, []);

      return ngayChieu.map((item, index) => {
        return (
          <NgayChieu
            key={index}
            ngayChieu={item}
            maNgayChieu={this.maNgayChieu}
          />
        );
      });
    }
  };
  maNgayChieu = maLichChieu => {
    this.setState({
      maLichChieu: maLichChieu
    });
  };

  renderLichChieu = (keyWord, maLichChieu) => {
    if (this.props.movie.lichChieu) {
      const mang = this.props.movie.lichChieu.filter(item => {
        return item.thongTinRap.maHeThongRap == keyWord;
      });

      const mang2 = mang.filter(item => {
        return (
          new Date(item.ngayChieuGioChieu).toLocaleDateString() == maLichChieu
        );
      });

      var helper = [];

      var lich = mang2.reduce((r, o) => {
        var key = o.thongTinRap.tenRap + "-" + o.thongTinRap.maCumRap;

        if (!helper[key]) {
          helper[key] = Object.assign({}, o); // create a copy of o
          r.push(helper[key]);
        }

        return r;
      }, []);

      return lich.map((item, index) => {
        return <LichChieu key={index} lichChieu={item} mang2={mang2} />;
      });

      // if(mang2.length > 0){
      //   const lichChieu = lich[0]
      //   return <LichChieu lichChieu={lichChieu} />
      // }
    }
  };

  nameRap = nameRap => {
    switch (nameRap) {
      case "BHDStar":
        this.setState({
          activeRap: {
            BHDStar: true,
            CineStar: false,
            activeRapCGV: false,
            activeRapGLX: false,
            activeRapLT: false,
            activeRapMGS: false
          }
        });
        break;

      case "CineStar":
        this.setState({
          activeRap: {
            BHDStar: false,
            CineStar: true,
            activeRapCGV: false,
            activeRapGLX: false,
            activeRapLT: false,
            activeRapMGS: false
          }
        });

        break;

      case "CGV":
        this.setState({
          activeRap: {
            BHDStar: false,
            CineStar: false,
            CGV: true,
            activeRapGLX: false,
            activeRapLT: false,
            activeRapMGS: false
          }
        });

        break;

      case "Galaxy":
        this.setState({
          activeRap: {
            BHDStar: false,
            CineStar: false,
            CGV: false,
            Galaxy: true,
            activeRapLT: false,
            activeRapMGS: false
          }
        });

        break;

      case "LotteCinima":
        this.setState({
          activeRap: {
            BHDStar: false,
            CineStar: false,
            CGV: false,
            Galaxy: false,
            LotteCinima: true,
            activeRapMGS: false
          }
        });

        break;

      case "MegaGS":
        this.setState({
          activeRap: {
            BHDStar: false,
            CineStar: false,
            CGV: false,
            Galaxy: false,
            LotteCinima: false,
            MegaGS: true
          }
        });

        break;

      default:
        break;
    }

    this.setState({
      rap: nameRap
    });
  };

  render() {
    let { movie, loading } = this.props;

    if(loading){
      return(
        <div className="loading">

   <div className="loader" />


        </div>
      )
    }


    return (
      <div className="DetailMovie">
        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId={this.state.youtube}
          onClose={() => this.setState({ isOpen: false })}
        />
        <div className="DetailMovie__content">
          <div className="container">
            <div className="title__detail">
              <Link to={`/`}>Trang Chủ</Link>
              <div></div>
              <span>{movie.tenPhim}</span>
            </div>
            <div className="row">
              <div className="DetailMovie__img col-sm-4">
                <img src={movie.hinhAnh} />
              </div>
              <div className="col-sm-8">
                <div className="DetailMovie__right">
                  <h3>{movie.tenPhim}</h3>
                  <p>{movie.moTa}</p>
                  <p>
                    Khởi chiếu
                    <span>
                      {new Date(movie.ngayKhoiChieu).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    Giờ chiếu
                    <span>
                      {new Date(movie.ngayKhoiChieu).toLocaleTimeString()}
                    </span>
                  </p>

                  <div className="DetailMovie__btn">
                    <button
                      onClick={() => {
                        this.openModal(movie.trailer);
                      }}
                      className="btn__buy"
                    >
                      XEM TRAILER
                    </button>
                    <a className="btn__buy" href="#lichchieu">
                      <i className="fa fa-ticket-alt" />
                      Mua Vé
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section id="lichchieu" className="movie">
            <div className="movie__content">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#home">
                    Lịch Chiếu
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#menu1">
                    Bình Luận
                  </a>
                </li>
              </ul>
              {/* Tab panes */}

              <div className="tab-content">
                <div className="tab-pane active" id="home">

                  <section className="date__time">
                    <div className="date__time__content">
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-4">
                            <div id="cinematab" className="cinema_tab">
                              <div
                                className={
                                  this.state.activeRap.BHDStar
                                    ? "tablinks active"
                                    : "tablinks"
                                }
                                onClick={() => {
                                  this.nameRap("BHDStar");
                                }}
                              >
                                <img
                                  src="http://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
                                  alt=""
                                />
                                <p>BHDStar</p>
                              </div>

                              <div
                                className={
                                  this.state.activeRap.CineStar
                                    ? "tablinks active"
                                    : "tablinks"
                                }
                                onClick={() => {
                                  this.nameRap("CineStar");
                                }}
                              >
                                <img
                                  src="https://s3img.vcdn.vn/123phim/2018/09/1721cfa98768f300c03792e25ceb0191.png"
                                  alt=""
                                />
                                <p>CineStar</p>
                              </div>
                              <div
                                className={
                                  this.state.activeRap.CGV
                                    ? "tablinks active"
                                    : "tablinks"
                                }
                                onClick={() => {
                                  this.nameRap("CGV");
                                }}
                              >
                                <img
                                  src="http://movie0706.cybersoft.edu.vn/hinhanh/cgv.png"
                                  alt=""
                                />
                                <p>CGV</p>
                              </div>
                              <div
                                className={
                                  this.state.activeRap.Galaxy
                                    ? "tablinks active"
                                    : "tablinks"
                                }
                                onClick={() => {
                                  this.nameRap("Galaxy");
                                }}
                              >
                                <img
                                  src="http://movie0706.cybersoft.edu.vn/hinhanh/galaxy-cinema.png"
                                  alt=""
                                />
                                <p>Galaxy</p>
                              </div>
                              <div
                                className={
                                  this.state.activeRap.LotteCinima
                                    ? "tablinks active"
                                    : "tablinks"
                                }
                                onClick={() => {
                                  this.nameRap("LotteCinima");
                                }}
                              >
                                <img
                                  src="http://movie0706.cybersoft.edu.vn/hinhanh/lotte-cinema.png"
                                  alt=""
                                />
                                <p>LotteCinima</p>
                              </div>
                              <div
                                className={
                                  this.state.activeRap.MegaGS
                                    ? "tablinks active"
                                    : "tablinks"
                                }
                                onClick={() => {
                                  this.nameRap("MegaGS");
                                }}
                              >
                                <img
                                  src="http://movie0706.cybersoft.edu.vn/hinhanh/megags.png"
                                  alt=""
                                />
                                <p>MegaGS</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-8">
                            <div className="date">
                              {this.renderNgayChieu(this.state.rap)}
                            </div>
                            <div className="cinema_tab2">
                              {this.renderLichChieu(
                                this.state.rap,
                                this.state.maLichChieu
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>



                  

                  {/*             
           {this.renderHTML()} */}
                </div>
                <div className="tab-pane fade" id="menu1"></div>
              </div>
            </div>
            
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.movieReducer.movie)
  return {
    movie: state.movieReducer.movie,
    loading:state.movieReducer.loading
  };
};

const mapDispatchToProps = dispatch => {

  return {
    getDetailMovie: id => {
      dispatch(action.actGetDetailMovie(id));
    },

    setLoading: () => {
      dispatch(action.actLoading());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);
