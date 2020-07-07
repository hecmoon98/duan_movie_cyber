import React from 'react'
import {Route} from "react-router-dom";
import NavBar from "./../component/navbar";

const HomeLayout = props => {
    return (
      <div>
        <NavBar />
        {props.children}
      </div>
    );
  };

  export default function HomeTemplate({ Component, ...props }) {
    return (
      <Route
        {...props}
        render={propsComponent => (
          <HomeLayout>
            <Component {...propsComponent} />
          </HomeLayout>
        )}
      />
    );
  }

