import React, { Component } from 'react';
import Banner from "./../../component/banner";
import Movie from "./../../component/movie";
import Cinema from "./../../component/cinema";
import News from "./../../component/news";
import { connect } from "react-redux";
import * as action from "../../redux/action";

class Home extends Component {

    componentWillMount(){
        this.props.setLoading()
    }
    
    
    render() {
        let { loading } = this.props;

    if(loading){
      return(
        <div className="loading">

   <div className="loader" />


        </div>
      )
    }

        return (
            <div>
                <Banner />
                <Movie />
                <Cinema />
                <News />


            </div>
        )
    }
}



const mapStateToProps = state => {

    
    return {
      loading:state.movieReducer.loading
    };
  };
  
  const mapDispatchToProps = dispatch => {
  
    return {
  
      setLoading: () => {
        dispatch(action.actLoading());
      },
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);
  
