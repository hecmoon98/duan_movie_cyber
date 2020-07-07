import * as ActionType from "./../constans/ActionType";

let initialState = {
  listMovie: [],
  movie: {},
  listCinema: [],
  listCumRap: [],
  listThongTin: {},
  listPhongVe: {},
  listNewsCategory: [],
  listNews: [],
  NewsDetail: {},
  loading: false
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_LIST_MOVIE:
      state.listMovie = action.listMovie;

      return { ...state, loading: false };

    case ActionType.GET_DETAIL_MOVIE:
      state.movie = action.movie;

      return { ...state, loading: false };

    case ActionType.GET_LIST_CINEMA:
      state.listCinema = action.listCinema;

      return { ...state };

    case ActionType.LOADING:
      return { ...state, loading: true };

    case ActionType.GET_LIST_CUM_RAP:
      state.listCumRap = action.listCumRap;

      return { ...state };

    case ActionType.GET_THONG_TIN_LICH_CHIEU:
      state.listThongTin = action.listThongTinLichChieu;

      return { ...state };

    case ActionType.GET_LIST_PHONG_VE:
      state.listPhongVe = action.getPhongVe;
      return { ...state, loading: false };

    case ActionType.GET_NEWS_CATEGORY:
      state.listNewsCategory = action.listCategory;
      return { ...state };

    case ActionType.GET_NEWS:
      console.log(action.listNews.news);
      state.listNews = action.listNews.news;
      return { ...state };

    case ActionType.GET_NEWS_DETAIL:
      state.NewsDetail = action.NewsDetail;
      return { ...state, loading: false };

    case ActionType.POST_ADMIN_NEWS:
  

      let user = { ...action.postAdminNews };
      state.listNews = [...state.listNews, user];


      return { ...state };


    case ActionType.DELETE_ADMIN_NEWS:

      let listNews = [...state.listNews];
      let index = listNews.findIndex(item => item._id === action.user._id);
  
      if (index !== -1) {
        listNews.splice(index, 1);
        state.listNews = listNews;
      }
      return { ...state };

    default:
      return { ...state };
  }
};

export default movieReducer;
