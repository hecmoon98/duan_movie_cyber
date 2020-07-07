import React, { Component } from "react";
import * as action from "./../../redux/action";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",
      matKhau: ""
    };
  }

  handleOnChange = e => {
    let { name, value } = e.target;
    console.log(e.target.value);

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state, this.props.history);
    this.props.loginNews(this.state, this.props.history);
  };

  render() {
    return (
      <div className="container">
        <div className="col-sm-6 mx-auto">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Username"
                type="text"
                className="form-control"
                name="taiKhoan"
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Password"
                type="text"
                className="form-control"
                name="matKhau"
                onChange={this.handleOnChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispath => {
  return {
    login: (user, history) => {
      dispath(action.actLoginAdmin(user, history));
    },
    loginNews: (user, history) => {
      dispath(action.actLoginNews(user, history));
    }
  };
};

export default connect(null, mapDispatchToProps)(Admin);
