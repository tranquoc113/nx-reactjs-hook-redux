import React, {Suspense, lazy} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import { DashboardPage } from './pages/DashboardPage';

export default function BasePage(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard"/>
        }
        <Route path="/" component={DashboardPage}/>
        {/*<Redirect to="error/error-v1"/>*/}
      </Switch>
      </Suspense>
  )
}
