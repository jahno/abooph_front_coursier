import React from 'react';

import Layout from 'components/layout/app';

import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import { OrderList, OrderDetail } from './components';

export default function Steed() {
  const { path } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <OrderList/>
        </Route>

        <Route path={`${path}/:id/detail`}>
          <OrderDetail />
        </Route>

        <Redirect to={path}/>
      </Switch>
    </Layout>
  );
}
