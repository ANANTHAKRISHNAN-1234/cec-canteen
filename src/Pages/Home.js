import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Banner from '../Components/Banner/Banner'
import Card from '../Components/Card/Card'
import MenuSection from '../Components/Menu/MenuSection/MenuSection'
import AboutSection from '../Components/About/AboutSection/AboutSection';
export default function Home() {
  return (
    <div>
        <Navbar/>
        <Banner/>
        <Card/>
        <MenuSection/>
        <AboutSection/>
    </div>
  )
}
