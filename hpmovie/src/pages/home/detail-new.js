import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/action";
const DetailNew = props => {
  useEffect(() => {
    const id = props.match.params.id;
    props.getNewsDetail(id);
    props.setLoading();
  }, []);
  const { newsDetail } = props;

  let { loading } = props;

  if (loading) {
    return (
      <div className="loading">
        <div className="loader" />
      </div>
    );
  }

const srcYoutube=()=>{
  let src;
  if(newsDetail.newsTrailer){
    src = <iframe
    allowfullscreen=""
    frameborder="0"
    height="420"
    src={`https://www.youtube.com/embed/${newsDetail.newsTrailer}`}
    width="700"
  ></iframe>
  }
  else{
    src = "";
  }
  return src;
}
  return (
    <section className="detail-news">
      <div className="detail-news__content">
        <h1>{newsDetail.newsTitle}</h1>
        <p>{newsDetail.newsIntroduce}</p>
        <p style={{ textAlign: "center" }}>
          {srcYoutube()}
        </p>
        <p>{newsDetail.newsContent}</p>
        <p style={{ textAlign: "center" }}>
          
          <img src={newsDetail.newsImages2} />
        </p>
        <p>{newsDetail.newsContent2}</p>

        <p style={{ textAlign: "center" }}>
          <img src={newsDetail.newsImages3} />
        </p>

        <p>{newsDetail.newsContent3}</p>
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    newsDetail: state.movieReducer.NewsDetail,
    loading:state.movieReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNewsDetail: id => {
      dispatch(action.actGetDetailNews(id));
    },
    setLoading: () => {
      dispatch(action.actLoading());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailNew);
