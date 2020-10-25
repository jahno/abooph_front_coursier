import React from 'react';
import { Route, Redirect } from "react-router-dom";
import {connect} from "react-redux";

function PublicRoute({component: Component, isAuthenticated, ...rest}){
    return (
        <Route
            {...rest}
            render={props => {
                if(!isAuthenticated){
                    return (
                        <Component {...props}/>
                    )
                }else{
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                            }}
                        />
                    )
                }
            }}
        />
    )
}

const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(PublicRoute);
  
  