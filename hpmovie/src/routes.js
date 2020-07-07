import Home from "./../src/pages/home/home";
import DetailMovie from "./pages/home/detailmovie";

import Dashboard from "./pages/admin/Dashboard";
import ThemNguoiDung from "./pages/admin/ThemNguoiDung";
import TicketMovie from "./pages/home/ticket-movie";
import Ticket from "./pages/home/Ticket";
import SignIn from "./pages/home/login";
import detailNew from "./pages/home/detail-new";


import adminNews from "./pages/admin-news/page/admin-news";
import adminNewsUser from "./pages/admin-news/page/admin-user";




const routesHome = [

  {
    path: "/",
    exact: true,
    component: Home
  },

  {
    path: "/detail-movie/:id",
    exact: false,
    component: DetailMovie
  }, 
  {
    path: "/ticket-movie/:id",
    exact: false,
    component: TicketMovie
  },

  {
    path: "/ticket",
    exact: false,
    component: Ticket
  },
  {
    path: "/signin",
    exact: false,
    component: SignIn
  },

  {
    path: "/detail-news/:id",
    exact: false,
    component: detailNew
  }, 

];

const routesAdmin = [
  {
    path: "/dashboard",
    exact: false,
    component: Dashboard
  },
  {
    path: "/them-nguoi-dung",
    exact: false,
    component: ThemNguoiDung
  }
];


const routesAdminNews = [
  {
    path: "/admin-news",
    exact: false,
    component: adminNews
  },
  {
    path: "/admin-user",
    exact: false,
    component: adminNewsUser
  },
  
];


export { routesHome, routesAdmin,routesAdminNews };
