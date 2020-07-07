import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as action from "./../redux/action";

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: "Mời Bạn Chon Phim...",
      movieTF: false,
      movieTFF: false,

      getRapPhim:"",
      rapPhim: "Rap Phim",
      rapPhimTF: false,
      rapPhimTFF: false,

      getNgayXem:"",
        ngayXem: "Ngày Xem",
      ngayXemTF: false,
      ngayXemTFF: false,

      suatChieu: "Suất Chiếu",
      suatChieuTF: false,
      suatChieuTFF: false,
      maLichChieu:""
    };
  }

  handlMovie = (movie, maphim, movieTF) => {
    this.props.getRapPhim(maphim);
    this.setState({
      rapPhimTF: true,
      movieTFF: true,
      movie,
      movieTF,
    });
  };

  handlMovieTF = tf => {
    if (tf == false) {
      tf = true;
    } else {
      tf = false;
    }
    this.setState({
      movieTF: tf
    });
  };

  handlRapPhim =(rapPhim,rapPhimTF)=>{
    this.setState({
      getRapPhim:rapPhim,
      rapPhim,
      rapPhimTF,
      rapPhimTFF:true,
      ngayXemTF: true,
    });
  }


  handlRapPhimTF = tf =>{
    if (tf == false) {
      tf = true;
    } else {
      tf = false;
    }
    this.setState({
      rapPhimTF: tf
    });
  }

  handlNgayXem=(ngayXem, ngayXemTF)=>{
   
 
 
    this.setState({
      getNgayXem:ngayXem,
        ngayXem,
        ngayXemTF,
        ngayXemTFF:true,
        suatChieuTF: true,
    });
  }

  handlNgayXemTF = (tf) =>{


    if (tf == false) {
      tf = true;
    } else {
      tf = false;
    }



    this.setState({
      
        ngayXemTF:tf
      
    });

  }


  handlsuatChieu=(suatChieu, suatChieuTF,maLichChieu)=>{
   
 
 
    this.setState({
      suatChieu,
        suatChieuTF,
        suatChieuTFF:true,
        maLichChieu
     
    });
  }



  handlsuatChieuTF = tf =>{
    if (tf == false) {
      tf = true;
    } else {
      tf = false;
    }
    this.setState({
      suatChieuTF: tf
    });
  }

  renderMovie = () => {
    return this.props.listMovie.map((movie, index) => {
      return (
        <li
          onClick={() => {
            this.handlMovie(movie.tenPhim, movie.maPhim, false);
          }}
          key={index}
          className="tab__li_2"
        >
          {movie.tenPhim}{" "}
        </li>
      );
    });
  };

  renderRapPhim = ()=>{

    if(this.props.rapMovie.lichChieu){

      let helper = [];
      let rapPhim = this.props.rapMovie.lichChieu.reduce((r, o) => {

        var key = o.thongTinRap.tenHeThongRap
          new Date(o.ngayChieuGioChieu).toLocaleDateString();

        if (!helper[key]) {
          helper[key] = Object.assign({}, o); // create a copy of o
          r.push(helper[key]);
        }

        return r;
      }, []);


  
        return rapPhim.map((rapPhim,index)=>{
          return (
            <li
            onClick={() => {
              this.handlRapPhim(rapPhim.thongTinRap.maHeThongRap,false);
            }}
            key={index}
            className="tab__li_2"
          >
            {rapPhim.thongTinRap.maHeThongRap}
          </li>
          );
        })
      

      
      
    }

    return (
      <li
        className="tab__li_2"
      >
        Vui lòng chọn phim
      </li>
    )

  }


  renderNgayXem=(maRap)=>{

    if(this.props.rapMovie.lichChieu){

      const mang = this.props.rapMovie.lichChieu.filter(item => {
        return item.thongTinRap.maHeThongRap == maRap;
      });


      var helper = [];

      var ngayXem = mang.reduce((r, o) => {
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
      
      if(ngayXem.length > 0 ){
        return ngayXem.map((ngayXem,index)=>{
          return ( 
          <li
            onClick={() => {
              this.handlNgayXem(new Date(ngayXem.ngayChieuGioChieu).toLocaleDateString(),false);
            }}
            key={index}
            className="tab__li_2"
          >
            {new Date(ngayXem.ngayChieuGioChieu).toLocaleDateString()}
          </li>
          );
        })
      }else{

        return (
          <li
            className="tab__li_2"
          >
            Vui lòng chon rạp
          </li>
        )

      }



      


    }


    return (
      <li
        className="tab__li_2"
      >
        Vui lòng chon rạp
      </li>
    )

    

   



  }

  renderSuatChieu =(maRap,ngayXem)=>{

    if(this.props.rapMovie.lichChieu){

      const mang = this.props.rapMovie.lichChieu.filter(item => {
        return item.thongTinRap.maHeThongRap == maRap;
      });

      const mang2 = mang.filter(item => {
        return (
          new Date(item.ngayChieuGioChieu).toLocaleDateString() == ngayXem
        );
      });


      if(mang2.length>0){
        return mang2.map((item,index)=>{
          return(
            <li
            onClick={() => {
              this.handlsuatChieu(new Date(item.ngayChieuGioChieu).toLocaleTimeString(),false,item.maLichChieu);
            }}
            key={index}
            className="tab__li_2"
          >
            {new Date(item.ngayChieuGioChieu).toLocaleTimeString()}
          </li>
          )
        })
      }else{
        return (
        <li
          className="tab__li_2"
        >
          Vui lòng chon ngày xem
        </li>
      )}

    }


    
    return (
      <li
        className="tab__li_2"
      >
        Vui lòng chon ngày xem
      </li>
    )

    
  }




  render() {
 
    let muaVeNgay = this.state.movieTFF && this.state.ngayXemTFF && this.state.suatChieuTFF && this.state.rapPhimTFF
   
    return (
      <section className="banner">
        <div id="carouselId" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-target="#carouselId"
              data-slide-to={0}
              className="active"
            />
            <li data-target="#carouselId" data-slide-to={1} />
            <li data-target="#carouselId" data-slide-to={2} />
            <li data-target="#carouselId" data-slide-to={3} />
            <li data-target="#carouselId" data-slide-to={4} />
          </ol>
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active">
              <img src="./img/banner2.jpg" alt="#123" />
            </div>
            <div className="carousel-item">
              <img src="./img/banner4.jpg" alt="#123" />
            </div>
            <div className="carousel-item">
              <img src="./img/banner3.jpg" alt="#123" />
            </div>
            <div className="carousel-item">
              <img src="./img/banner2.jpg" alt="#123" />
            </div>
            <div className="carousel-item">
              <img src="./img/banner5.jpg" alt="#123" />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselId"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselId"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>

          <div className="banner__list">
            <ul className="tab__ul_1">
              <li
                onClick={() => {
                  this.handlMovieTF(this.state.movieTF);
                }}
                className="tab__li_1"
              >
                <div className="li__title">{this.state.movie}</div>
                <ul
                  className={this.state.movieTF ? "tab__ul_2 tf" : "tab__ul_2"}
                >
                  {this.renderMovie()}
                </ul>
              </li>

              <li className="tab__li_1" 
              onClick={() => {
                  this.handlRapPhimTF(this.state.rapPhimTF);
                }}
              >
                <div className="li__title">{this.state.rapPhim}</div>

                <ul
                  className={this.state.rapPhimTF ? "tab__ul_2 tf" : "tab__ul_2"}
                >
                   {this.renderRapPhim()}
                </ul>
                
              </li>

              <li className="tab__li_1"
                onClick={()=>{
                  this.handlNgayXemTF(this.state.ngayXemTF)
                }}
              >
            
              <div className="li__title">{this.state.ngayXem}</div>
            
              
              <ul
                  className={this.state.ngayXemTF ? "tab__ul_2 tf" : "tab__ul_2"}
                >
                  {this.renderNgayXem(this.state.getRapPhim)}
                </ul>
                
                </li>


              <li 
               onClick={()=>{
                  this.handlsuatChieuTF(this.state.suatChieuTF)
                }}
              className="tab__li_1">

               <div className="li__title">{this.state.suatChieu}</div>

               <ul
                  className={this.state.suatChieuTF ? "tab__ul_2 tf" : "tab__ul_2"}
                >
                  {this.renderSuatChieu(this.state.getRapPhim,this.state.getNgayXem)}
                </ul>
                
              </li>
              <li className="tab__li_1">
              <Link to={`/ticket-movie/${this.state.maLichChieu}`}>
                <button disabled={!muaVeNgay} to={`/ticket-movie/${this.state.maLichChieu}`} className="btn ">
                  MUA VÉ NGAY
                </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    listMovie: state.movieReducer.listMovie,
    rapMovie: state.movieReducer.movie
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRapPhim: id => {
      dispatch(action.actGetDetailMovie(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
