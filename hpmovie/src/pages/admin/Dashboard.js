import React, { Component } from "react";
import * as action from "../../redux/action/index";
import { connect } from "react-redux";

class Dashboard extends Component {

    componentDidMount() {
        this.props.getListMovieAdmin();
      }
  render() {
    // if(localStorage.setItem("UserAdmin", JSON.stringify(result.data).tenHinh)){
    //     return (
    //         <div>
    //             Dashboard
    //         </div>
    //     )
    // }

    console.log(this.props.listMovie)
    return <div>Dashboard</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    // listMovie: state.movieReducer.listMovie
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListMovieAdmin: () => {
        dispatch(action.actGetListMovieAdmin());
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
