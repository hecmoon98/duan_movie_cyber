import React, { Component } from 'react';


class CumrapCinema extends Component {
    constructor(props) {
   
        super(props);
        this.state = {
          keyCumRap:"",
       
        };
        
      }


      keyCumRap =(cumRap)=>{
       
        
        this.setState({
          keyCumRap:cumRap
          
        })
      }


    renderCumRap=()=>{

        return this.props.maCumRap.map((item,index)=>{

          let classCumRap="";
          if(index===this.state.keyCumRap){
               classCumRap = "cinema__cumrap active"
          }
          else{
               classCumRap = "cinema__cumrap"
          }
            return <div key={index} onClick={()=>{this.keyCumRap(index)}}>
            
            <div  className={classCumRap} onClick={()=>{this.props.tenRap(item.tenCumRap)}}>
            
            <img src="https://s3img.vcdn.vn/123phim/2018/09/cgv-su-van-hanh-15380173580593.jpg"/>
            <div className="cinema__cumrap_detail">
                <p>{item.tenCumRap}</p>
                <p>{item.diaChi}</p>
            </div>
            </div>
        </div>
        })
    }

    
     
    

    render() {
      
      
        return (
            <div className="col-sm-7 col-7__cumrap">
                      {this.renderCumRap()}
                  </div>
        )
    }


    
}







export default (CumrapCinema);