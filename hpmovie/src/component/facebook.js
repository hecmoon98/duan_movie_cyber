import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';

export default class Facebook extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: false,
          userID:'',
          name:'',
          email:'',
          picture:''
        };
      }

      responseFacebook=(response)=>{
        console.log(response)
        this.setState({
            isLoggedIn: true,
            userID:response.userID,
          name:response.name,
          email:response.email,
          picture:response.picture.data.url
        })
      }
      logOutFace=()=>{
        this.setState({
            isLoggedIn: false,
            userID:'',
          name:'',
          email:'',
          picture:''
        })
      }
      componentClicked = ()=>{console.log('componentClicked')}
    render() {
        let fbContent;
        
        if(this.state.isLoggedIn){
            fbContent = (
                <div 
                    style={{
                        width: '400px',
                        margin:'auto',
                        background: '#f4f4f4',
                        padding:'20px'
                    }}
                >
                    <img src={this.state.picture} alt={this.state.name} />
                    <h2>Welcome {this.state.name}</h2>
                    Email: {this.state.email}<br/>
                    <button className="btn btn-danger" onClick={this.logOutFace}>Logout</button>
                </div>
            )
        }else{
            fbContent = ( <FacebookLogin
            appId="860750864350777"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook} /> )
        }
        return (
            <div className="face_login">
                {fbContent}
            </div>
        )
    }
}

