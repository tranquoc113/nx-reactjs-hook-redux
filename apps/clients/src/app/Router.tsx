import { Switch } from "react-router-dom";
import Layouts from './layout/Layout';
import BasePage from './BasePage';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { loadLanguage } from '@mycloudfly/redux';
export function Routes(){
  const {t, i18n} = useTranslation('common');
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(loadLanguage());
    console.log(localStorage.getItem('la'))
    i18n.changeLanguage(localStorage.getItem('la') as string);
  },[])
  return (
    <Switch>
      <Layouts>
        <BasePage/>
      </Layouts>
    </Switch>
  )
}
