import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Router';
// @ts-ignore
export function App({basename}) {

  return (
   <BrowserRouter basename={basename}>
     <Routes/>
   </BrowserRouter>
  );
}

export default App;
