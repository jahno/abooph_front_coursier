import React from 'react';

import Layout from '../../layout/app';

import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import { Profile, UpdateProfile } from './components';

export default function Index() {
  const { path } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <Profile/>
        </Route>

        <Route path={`${path}/modifier`}>
          <UpdateProfile />
        </Route>

        <Redirect to={path}/>
      </Switch>
    </Layout>
  );
}
