import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import './index.css';

import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './page/Home';
import Menu from './page/Menu';
import Contact from './page/Contact';
import About from './page/About';
import Login from './page/login';
import NewProduct from './page/newProduct';
import Signup from './page/Signup';
import { store } from './redux/index';
import {Provider} from "react-redux"
import Cart from './page/Cart';
import Logout from './page/Logout';
import Account from './page/Account';
import ManagementProduct from './page/ManagementProduct';
import MentionsLegales from './pageFooter/MentionLegales';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      {/* <Route path='menu' element={<Menu />} /> */}
      <Route path='menu/:filterby' element={<Menu />} />
      <Route path='contact' element={<Contact />} />
      <Route path='about' element={<About />} />
      <Route path='login' element={<Login />} />
      <Route path='newproduct' element={<NewProduct />}/>
      <Route path='signup' element={<Signup />} />
      <Route path='cart' element={<Cart />} />
      <Route path='logout' element={<Logout />} />
      <Route path='account' element={<Account />} />
      <Route path='managementproduct' element={<ManagementProduct />} />
      <Route path='mentions-legales' element={<MentionsLegales />}/>

   </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
