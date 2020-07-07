import React from "react";
// import ReactDOM from "react-dom";
//video
import ModalVideo from "react-modal-video";
//OwlCarousel

import OwlCarousel from 'react-owl-carousel2';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";



import * as action from "./../redux/action";
import { connect } from "react-redux";

import OneMovie from "./onemovie";




class Movie extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      youtube: ""
    };
    this.openModal = this.openModal.bind(this);

    this.setState({
      youtube: ""
    });
  }

  openModal(link) {
    let url = link;

    let ytbURL = "";

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
    this.props.getListMovie();



    
  }

  renderHTML = () => {
    
    
    return this.props.listMovie.map((movie, index) => {
      return <OneMovie key={index} movie={movie} openModal={this.openModal} />;
    });
  };

  

  render() {
    const options = {
      nav: true,
      rewind: true,
      autoplay: true,
      margin: 10,
      navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
      dots: false,
      loop:true,

      responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:6
        }
    }
  };
    console.log("render");
    return (
      <section id="movie" className="movie">
        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId={this.state.youtube}
          onClose={() => this.setState({ isOpen: false })}
        />
        <div className="movie__content">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#home">
                Phim Đang Chiếu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#menu1">
                Phim Sắp Chiếu
              </a>
            </li>
          </ul>
          {/* Tab panes */}

          <div className="tab-content">
            <div className="tab-pane active" id="home">

            <OwlCarousel ref="car" options={options}  >
            {this.renderHTML()}
            </OwlCarousel>
         
{/*             
              {this.renderHTML()} */}
            </div>
            <div className="tab-pane fade" id="menu1">

            <OwlCarousel ref="car" options={options}  >
            {this.renderHTML()}
            </OwlCarousel>
           
            </div>
          </div>
          
        </div>

        


        
        
      </section>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    listMovie: state.movieReducer.listMovie
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListMovie: () => {
      dispatch(action.actGetListMovieAPI());
    }
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
