import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { decrement, increment } from '@mycloudfly/redux';
import {useTranslation} from "react-i18next";
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

export function DashboardPage() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);
  const {t, i18n} = useTranslation('common');
  const openDrawer=()=>{
    console.log('go')
  }
  const closeDrawer=()=>{
    console.log('leaave')
  }
  return (
   <>
     <h1>DashBoard</h1>
     <h1>{t('welcome.title', {framework:'React'})}</h1>
     <ButtonGroup color="primary" aria-label="outlined primary button group">
       <Button onClick={()=>dispatch(increment())}>One</Button>
       <Button>{count}</Button>
       <Button onClick={()=>dispatch(decrement())}>Three</Button>
     </ButtonGroup>

     <button onClick={() => i18n.changeLanguage('vi')}>vi</button>
     <button onClick={() => i18n.changeLanguage('en')}>en</button>

     <button className="btn btn-success" onMouseOver={openDrawer} onMouseOut={closeDrawer}>
       Toast
     </button>
     <NavLink to="tickets" exact activeClassName="link-active">
       ok
     </NavLink>
   </>

  );
}
