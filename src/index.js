import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Protected from './Components/Protected';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword'
import Home from './Pages/Home';
import About from './Pages/About';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Protected />} >
        <Route path="/" index element={<Home />} />
      </Route>
      <Route path='/about' element={<About/>} />
    </Route>
  )
);
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
