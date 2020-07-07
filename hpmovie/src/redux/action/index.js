import * as ActionType from "./../constans/ActionType";
import Axios from "axios";

export const actGetListMovieAPI = () => {
    return dispatch => {
        Axios({
            method: "GET",
            url: "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",

        })
            .then((result) => {
                dispatch({
                    type: ActionType.GET_LIST_MOVIE,
                    listMovie: result.data
                });

            })
            .catch((err) => {
                console.log(err)
            });
    }
}


export const actGetDetailMovie = (id) => {
    return dispatch => {
        Axios({
            method: "GET",
            url: `http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,

        })
            .then((result) => {
                dispatch({
                    type: ActionType.GET_DETAIL_MOVIE,
                    movie: result.data
                });

            })
            .catch((err) => {
                console.log(err)
            });
    }
}

export const actGetCinema = () => {
    return dispatch => {
        Axios({
            method: "GET",
            url: `http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap`,

        })
            .then((result) => {
                dispatch({
                    type: ActionType.GET_LIST_CINEMA,
                    listCinema: result.data

                });

            })
            .catch((err) => {
                console.log(err)
            });
    }
}

export const actGetCumRap = (cumRap) => {
    return dispatch => {
        Axios({
            method: "GET",
            url: `http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cumRap}`,

        })
            .then((result) => {

                dispatch({
                    type: ActionType.GET_LIST_CUM_RAP,
                    listCumRap: result.data

                });

            })
            .catch((err) => {
                console.log(err)
            });
    }
}


export const actThongTinLichChieu = (cumRap) => {
    return dispatch => {
        Axios({
            method: "GET",
            url: `http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cumRap}&maNhom=GP01`,

        })
            .then((result) => {
                dispatch({
                    type: ActionType.GET_THONG_TIN_LICH_CHIEU,
                    listThongTinLichChieu: result.data

                });

            })
            .catch((err) => {
                console.log(err)
            });
    }
}


export const actLoading = () => {
    return {
        type: ActionType.LOADING,
    };
};


export const actGetPhongVe = (idLC) => {
    return dispatch => {
        Axios({
            method: "GET",
            url: `http://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idLC}`
        })
            .then(result => {
            

                dispatch({
                    type: ActionType.GET_LIST_PHONG_VE,
                    getPhongVe: result.data

                });
            })
            .catch(err => {
                console.log(err.response.data);
            });
    };
};



export const actDatVe = (user) => {

    const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  
    return dispatch => {
      Axios({
        method: "POST",
        url:"http://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
        data: user,
        headers: {
          Authorization: `Bearer ${UserAdmin.accessToken}` 
        }
      })
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
    };
  };


//   export const actDangNhapHome = (user) => {

//     const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  
//     return dispatch => {
//       Axios({
//         method: "POST",
//         url:"http://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
//         data: user,
//         headers: {
//           Authorization: `Bearer ${UserAdmin.accessToken}` 
//         }
//       })
//         .then(result => {
//           dispatch({
//             type: ActionType.POST_DAT_VE,
//             listMovie: result.data
//           });
//         })
//         .catch(err => {
//           console.log(err.response.data);
//         });
//     };
//   };


  export const actDangNhapHome = (user, history) => {
    return dispatch => {
        Axios({
            method: "POST",
            url: "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
            data: user
        })
            .then(result => {
               
       
                    localStorage.setItem("UserAdmin", JSON.stringify(result.data));
                    alert("Login success");
                    history.push("/");
              
            })
            .catch(err => {
                console.log(err.response.data);
            });
    };
};


export const actGetNewsCategory = () => {
    return dispatch => {
        Axios({
            method: "GET",
            url: "http://localhost:3002/category/",
          
        })
        .then(result => {
            dispatch({
              type: ActionType.GET_NEWS_CATEGORY,
              listCategory: result.data
            });
          })
          .catch(err => {
            console.log(err);
          });
    };
};
export const actGetNews = () => {
    return dispatch => {
        Axios({
            method: "GET",
            url: "http://localhost:3002/news/",
          
        })
        .then(result => {
            dispatch({
              type: ActionType.GET_NEWS,
              listNews: result.data
            });
          })
          .catch(err => {
            console.log(err);
          });
    };
};



export const actGetDetailNews = (id) => {
    return dispatch => {
        Axios({
            method: "GET",
            url: `http://localhost:3002/news/${id}`,

        })
            .then((result) => {
           
                dispatch({
                    type: ActionType.GET_NEWS_DETAIL,
                    NewsDetail: result.data
                });

            })
            .catch((err) => {
                console.log(err)
            });
    }
}



// export const actLoginAdmin = (user, history) => {
//     console.log(user)
//     return dispatch => {
//         Axios({
//             method: "POST",
//             url: "http://localhost:3002/user/login",
//             data: user
//         })
//             .then(result => {
//                 console.log(result.data);
                
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     };
// };



export const actLoginAdmin = (user, history) => {
    return dispatch => {
      Axios({
        method: "POST",
        url: "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        data: user
      })
        .then(result => {
          console.log(result.data);
         
            if (result.data.maLoaiNguoiDung === "QuanTri") {
                localStorage.setItem("UserAdmin", JSON.stringify(result.data));
                alert("Login success");
                history.push("/dashboard");
              } else {
                alert("K co quyen vao he thong");
              }
          
        })
        .catch(err => {
          console.log(err.response.data);
        });
    };
  };




  export const actLoginNews = (user, history) => {
    return dispatch => {
      Axios({
        method: "POST",
        url: "http://localhost:3002/user/login",
        data: user
      })
        .then(result => {
          console.log(result.data);
       
            if (result.data.chucVu === "Quang Li") {
                localStorage.setItem("UserAdmin", JSON.stringify(result.data));
                alert("Login success");
                history.push("/admin-news");
              } else {
                alert("K co quyen vao he thong");
              }
        
        })
        .catch(err => {
        //   console.log(err.response.data);
        });
    };
  };



  export const actPostAdminNews = (user) => {
    return dispatch => {
        Axios({
            method: "POST",
            url: `http://localhost:3002/news/`,
            data:user

        })
        .then(result => {
           
            dispatch({
                type: ActionType.POST_ADMIN_NEWS,
                postAdminNews: result.data.createdNews
            });
          })
          .catch(err => {
            console.log(err.response.data);
          });
    }
}



export const actDeleteAdminNews = (id,user) => {
    return dispatch => {
        Axios({
            method: "DELETE",
            url: `http://localhost:3002/news/${id}`,
            
       

        })
        .then(result => {
            
            dispatch({
                type: ActionType.DELETE_ADMIN_NEWS,
                user
            });
            
          })
          .catch(err => {
            console.log(err);
          });
    }
}


export const actPutAdminNews = (id,user) => {
    return dispatch => {
        Axios({
            method: "PUT",
            url: `http://localhost:3002/news/${id}`,
            data:user

        })
        .then(result => {
           console.log(result);
            // dispatch({
            //     type: ActionType.POST_ADMIN_NEWS,
            //     postAdminNews: result.data.createdNews
            // });
          })
          .catch(err => {
            console.log(err.response.data);
          });
    }
}






export const actGetListMovieAdmin = () => {
    return dispatch => {
        Axios({
            method: "GET",
            url: "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",

        })
            .then((result) => {
                dispatch({
                    type: ActionType.GET_LIST_MOVIE_ADMIN,
                    listMovieAdmin: result.data
                });

            })
            .catch((err) => {
                console.log(err)
            });
    }
}