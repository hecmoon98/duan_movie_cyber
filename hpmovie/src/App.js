import React from 'react';
import logo from './logo.svg';
import './App.css';



import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageNotFound from "./../src/pages/page-not-found";
import Texxx from "./pages/home/texxx"

import {routesHome,routesAdmin,routesAdminNews} from "./routes";
import HomeTemplate from "./templates/HomeTemplate";
import AdminTemplate from "./templates/AdminTemplate";
import AdminNewTemplate from "./templates/AdminNewTemplate";
 
import Admin from "./pages/admin/admin";




const showMenuHome = (routes) => {
  if(routes && routes.length>0){
    return routes.map((item,index)=>{
      return <HomeTemplate key={index} path={item.path} exact={item.exact} Component={item.component}/>
    });
  };
};

const showMenuAdmin = (routes) => {
  if(routes && routes.length>0){
    return routes.map((item,index)=>{
      return <AdminTemplate key={index} path={item.path} exact={item.exact} Component={item.component}/>
    });
  };
};

const showAdminNews = (routes) => {
  if(routes && routes.length>0){
    return routes.map((item,index)=>{
      return <AdminNewTemplate key={index} path={item.path} exact={item.exact} Component={item.component}/>
    });
  };
};






function App() {
  
  return (
    <BrowserRouter>
    <div>
    <Switch>
   

    {showMenuHome(routesHome)}
    {showMenuAdmin(routesAdmin)}
    {showAdminNews(routesAdminNews)}

    <Route path="/admin" component={Admin} />
    {/* trang PageNotFound- de cuoi cung */}
    <Route path="" component={PageNotFound}/>
    </Switch>

    </div>
    </BrowserRouter>
  );
}


export default App;
