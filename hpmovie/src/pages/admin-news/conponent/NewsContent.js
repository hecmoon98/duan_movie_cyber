import React, { Component } from "react";
import * as action from "../../../redux/action";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";






class NewsContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsImages: null,
      newsImages2: null,
      newsImages3: null,
      newsTrailer: "",
      newsTitle: "",
      newsIntroduce: "",
      newsContent: "",
      newsContent2: "",
      newsContent3: "",
      categoryId: "none",
      themSua:false,
      idSua:""
    };
  }

  componentDidMount() {
    this.props.getNews();
  }

  fileSelectedHandler = e => {
    let { name, value, files } = e.target;

    this.setState({
      [name]: files[0]
    });
  };

  fileUploadHandle2 = e => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("newsImages", this.state.newsImages, this.state.newsImages.name);
    fd.append(
      "newsImages2",
      this.state.newsImages2,
      this.state.newsImages2.name
    );
    fd.append(
      "newsImages3",
      this.state.newsImages3,
      this.state.newsImages3.name
    );
    fd.append("newsTrailer", this.state.newsTrailer);
    fd.append("newsTitle", this.state.newsTitle);
    fd.append("newsIntroduce", this.state.newsIntroduce);
    fd.append("newsContent", this.state.newsContent);
    fd.append("newsContent2", this.state.newsContent2);
    fd.append("newsContent3", this.state.newsContent3);
    fd.append("categoryId", this.state.categoryId);

    this.props.postAdminNews(fd);

    {
      this.renderTable();
    }
  };

  handleOnChange = e => {
    let { name, value } = e.target;
    console.log(e.target.value);

    this.setState({
      [name]: value
    });
  };

  
  handleSua=(id)=>{
    let mang;
   if(this.props.listNews){
   mang = this.props.listNews.filter(
     item=>{
       return item._id==id
     })
 
   }

   console.log(mang[0])

    this.setState({
      newsTrailer: mang[0].newsTrailer,
      newsTitle: mang[0].newsTitle,
      newsIntroduce: mang[0].newsIntroduce,
      newsContent: mang[0].newsContent,
      newsContent2: mang[0].newsContent2,
      newsContent3: mang[0].newsContent3,
      themSua:true,
      idSua:id
    })


    



    
  }



  renderTable = () => {
    console.log(this.props.listNews);
    if (this.props.listNews) {
      return this.props.listNews.map((item, index) => {
        let new_id = "";
        if (item.categoryId._id == "5e29fa820a21840e23b36875") {
          new_id = "Điện Ảnh";
        } else if (item.categoryId._id == "5e374d0b98db0e02aaff9631") {
          new_id = "Review";
        } else {
          new_id = "Khuyến Mãi";
        }
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <img
                src={item.newsImages}
                alt="Smiley face"
                height="60"
                width="120"
              ></img>
            </td>
            <td>{item.newsTitle}</td>
            <td>{item.newsIntroduce}</td>
            <td>{item.newsTrailer}</td>
            <td>{new_id}</td>
            <td>
              <Button
              onClick={()=>{this.handleSua(item._id)}}
                variant="contained"
                color="primary"
                type="button"
                data-toggle="modal"
                data-target="#myModal"
              >
                Sửa
              </Button>

              <Button
                variant="contained"
                color="secondary"
                type="button"
                onClick={() => {
                  this.handleDelete(item._id, item);
                }}
              >
                Xóa
              </Button>
            </td>
          </tr>
        );
      });
    }
  };

  handleDelete = (id, user) => {
    this.props.deleteNews(id, user);
  };

  handleThemNguoiDung = () => {
console.log("aaaaaaa")
    this.fileInput.value = "";
    this.fileInput2.value = "";
    this.fileInput3.value = "";
    

    this.setState({
      newsTrailer: "",
      newsTitle: "",
      newsIntroduce: "",
      newsContent: "",
      newsContent2: "",
      newsContent3: "",
      categoryId: "none",
      themSua:false
    });
  };

  renderFile = ()=>{
    let imgFile=false
    if(this.state.themSua){
      imgFile=true;
    }
    return imgFile;
  }


  handSuaNew =(e)=>{
    e.preventDefault();

    let mang;
    if(this.props.listNews){
    mang = this.props.listNews.filter(
      item=>{
        return item._id==this.state.idSua
      })
  
    }


    const user = {
    newsTrailer: this.state.newsTrailer,
    newsTitle: this.state.newsTitle,
    newsIntroduce: this.state.newsIntroduce,
    newsContent: this.state.newsContent,
    newsContent2: this.state.newsContent2,
    newsContent3: this.state.newsContent3,
    }

    console.log(user)

    this.props.putAdminNews(mang[0]._id,user);
    
  }




  handleUpSua =()=>{
    if(this.state.themSua){
      return(
        <Button
                    onClick={this.handSuaNew}
                    type="submit"
                    color="primary"
                    variant="contained"
                    data-dismiss="modal"
                  >
                    Sửa Tin
                  </Button>
      )
    }else{
      return(
        <Button
                    onClick={this.fileUploadHandle2}
                    type="submit"
                    color="primary"
                    variant="contained"
                    data-dismiss="modal"
                  >
                    Upload
                  </Button>
      );
    }
  }
  

  render() {
    return (
      <div className="NewsContent">
        <div className="them-nguoi-dung">
          {/* Button to Open the Modal */}
          <Button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#myModal"
            variant="contained"
            onClick={this.handleThemNguoiDung}
          >
            Thêm Người Dùng
          </Button>
          {/* The Modal */}
          <div className="modal" id="myModal">
            <div className="modal-dialog">
              <div className="modal-content">
                {/* Modal Header */}
                <div className="modal-header">
                  <h4 className="modal-title">{this.state.themSua ? "Sửa Tin Tức":"Thêm Tin Tức"}</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    ×
                  </button>
                </div>
                {/* Modal body */}
                <div className="modal-body">
                  <form noValidate autoComplete="off">
                  
                    <input
                    type="file"
                    name="newsImages"
                    hidden={this.renderFile()}
                    ref={ref=> this.fileInput = ref}
                    onChange={this.fileSelectedHandler}
                    />

                    <input
                      type="file"
                      name="newsImages2"
                      hidden={this.renderFile()}
                      ref={ref=> this.fileInput2 = ref}
                      onChange={this.fileSelectedHandler}
                    />

                    <input
                      type="file"
                      name="newsImages3"
                      hidden={this.renderFile()}
                      ref={ref=> this.fileInput3 = ref}
                      onChange={this.fileSelectedHandler}
                    />

                    <TextField
                      label="newsTrailer"
                      type="text"
                      name="newsTrailer"
                      value={this.state.newsTrailer}
                      onChange={this.handleOnChange}
                    />

                    <TextField
                      label="newsTitle"
                      type="text"
                      name="newsTitle"
                      value={this.state.newsTitle}
                      onChange={this.handleOnChange}
                    />

                    <TextField
                      label="newsIntroduce"
                      type="text"
                      name="newsIntroduce"
                      value={this.state.newsIntroduce}
                      onChange={this.handleOnChange}
                    />

                    <TextField
                      label="newsContent"
                      type="text"
                      name="newsContent"
                      value={this.state.newsContent}
                      onChange={this.handleOnChange}
                    />

                    <TextField
                      label="newsContent2"
                      type="text"
                      name="newsContent2"
                      value={this.state.newsContent2}
                      onChange={this.handleOnChange}
                    />
                    

                    <TextField
                      label="newsContent3"
                      type="text"
                      name="newsContent3"
                      value={this.state.newsContent3}
                      onChange={this.handleOnChange}
                    />

                    <InputLabel
                      style={{ padding: "20px 0px 0px 0" }}
                      id="demo-controlled-open-select-label"
                      htmlFor="cars"
                    >
                      categoryId:
                    </InputLabel>
                    <select
                     hidden={this.renderFile()}
                      onChange={this.handleOnChange}
                      name="categoryId"
                      id="cars"
                      value={this.state.categoryId}
                    >
                    <option>none</option>
                      <option value="5e29fa820a21840e23b36875">Điện Ảnh</option>
                      <option value="5e374d0b98db0e02aaff9631">Review</option>
                      <option value="5e374d1a98db0e02aaff9632">
                        Khuyến Mãi
                      </option>
                    </select>
                  </form>
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    data-dismiss="modal"
                  >
                    Thoát
                  </Button>

                  {this.handleUpSua()}

               
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="table__nguoi-dung">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header card-header-primary">
                      <h4 className="card-title ">Simple Table</h4>
                      <p className="card-category">
                        {" "}
                        Here is a subtitle for this table
                      </p>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table">
                          <thead style={{ color: "#9c27b0" }}>
                            <tr>
                              <th>ID</th>
                              <th>Images</th>
                              <th>Name</th>
                              <th>Introduce</th>
                              <th>Trailer</th>
                              <th>CategoryId</th>
                              <th>Chức Năng</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderTable()}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listNews: state.movieReducer.listNews
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postAdminNews: user => {
      dispatch(action.actPostAdminNews(user));
    },
    getNews: () => {
      dispatch(action.actGetNews());
    },
    deleteNews: (id, user) => {
      dispatch(action.actDeleteAdminNews(id, user));
    },
    putAdminNews: (id, user) => {
      dispatch(action.actPutAdminNews(id, user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsContent);
