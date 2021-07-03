import { Redirect, Switch, Route } from "react-router-dom";
import Layouts from './layout/layout';
import BasePage from './BasePage';
import LayoutDemo from './layout/LayoutDemo';
export function Routes(){
  return (
    // <Switch>
    //   <Layouts>
    //     <BasePage/>
    //   </Layouts>
    // </Switch>
    <Switch>
      <LayoutDemo>
        <BasePage/>
      </LayoutDemo>
    </Switch>
  )
}
