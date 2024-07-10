import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'
import Banner from './Components/Banner/Banner'
import Home from './Pages/Home'
export default function App() {
  return (
    <div>
       <Outlet/>
    </div>
  )
}


