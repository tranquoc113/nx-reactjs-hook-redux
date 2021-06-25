import { Redirect, Switch, Route } from "react-router-dom";
import Layouts from './layout/layout';
import BasePage from './BasePage';
export function Routes(){
  return (
    <Switch>
      <Layouts>
        <BasePage/>
      </Layouts>
    </Switch>
  )
}
